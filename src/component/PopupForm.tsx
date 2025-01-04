import React from 'react';

type Banner = {
  id: number;
  order: string;
  name: string;
  link: string;
  texts: string[];
  date: string;
  image: string;
};

type Props = {
  form: Partial<Banner>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Banner>>>;
  isEditing: boolean;
  onSave: (banner: Banner, isEditing: boolean) => void;
  onClose: () => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const PopupForm: React.FC<Props> = ({ form, setForm, isEditing, onSave, onClose, errors, setErrors }) => {

    const validateField = (name: string, value: string | string[]) => {
        if (name === 'name' && (!value)) {
          return 'Banner Name is required.';
        }
        if (name === 'link' && (!value)) {
          return 'Link is required.';
        }
        if (name === 'texts' && Array.isArray(value)) {
          const hasValidText = value.some(text => text.trim() !== '');
          if (!hasValidText) {
            return 'At least one valid text is required.';
          }
        }
        return '';
      };
      

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleTextChange = (index: number, value: string) => {
    const newTexts = [...(form.texts || [])];
    newTexts[index] = value;
    setForm(prev => ({ ...prev, texts: newTexts }));
    setErrors(prev => ({ ...prev, texts: validateField('texts', newTexts) }));
  };

  const addText = () => {
    setForm(prev => ({ ...prev, texts: [...(prev.texts || []), ''] }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {
      name: validateField('name', form.name || ''),
      link: validateField('link', form.link || ''),
      texts: validateField('texts', form.texts || []),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);
    if (hasErrors) {
      alert('Please fix the errors before submitting.');
      return;
    }

    const newBanner = { ...form } as Banner;
    onSave(newBanner, isEditing);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>{isEditing ? 'Edit Banner' : 'Create Banner'}</h3>

        <label>
          Banner Name:
          <input
            type="text"
            name="name"
            value={form.name || ''}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Link:
          <input
            type="text"
            name="link"
            value={form.link || ''}
            onChange={handleInputChange}
          />
          {errors.link && <span className="error">{errors.link}</span>}
        </label>

        <label>
          Texts:
          {form.texts?.map((text, index) => (
            <div key={index}>
              <input
                type="text"
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
            </div>
          ))}
            {errors.texts && <span className="error">{errors.texts}</span>}
          <button onClick={addText}>Add Text</button>
        </label>

        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setForm(prev => ({ ...prev, image: imageUrl }));
              }
            }}
          />
        </label>

        <div className="btn-container">
          <button onClick={onClose}>Close</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
