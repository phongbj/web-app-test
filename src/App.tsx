import React, { useState } from 'react';
import './App.css';

type Banner = {
  id: number;
  order: string;
  name: string;
  link: string;
  texts: string[];
  date: string;
  image: string;
};

const mockData: Banner[] = [
  {
    id: 1,
    order: '01',
    name: 'Main Banner Test 1',
    link: 'http://TTA.co.kr',
    texts: ['TTA Integrated Standard Portal Service: The standard for ICT standardization, leading ICT technology standardization.'],
    date: '2024-10-17',
    image: 'https://i.ibb.co/hLtjbg4/image-22.png',
  },
  {
    id: 2,
    order: '02',
    name: 'Main Banner Test 2',
    link: 'http://TTA.example.co.kr',
    texts: ['TTA Integrated Standard Portal Service: The standard for ICT standardization, leading ICT technology standardization.'],
    date: '2024-10-17',
    image: 'https://i.ibb.co/hLtjbg4/image-22.png',
  },
  {
    id: 3,
    order: '03',
    name: 'Lý Hồng Phong',
    link: 'https://via.placeholder.com/100',
    texts: ['phong test.'],
    date: '2024-10-17',
    image: 'https://i.ibb.co/NtnC7CT/133694002376763458.jpg',
  },
];

const App: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>(mockData);
  const [form, setForm] = useState<Partial<Banner>>({ texts: [''] });
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string | string[]) => {
    if (name === 'name' && (!value)) {
      return 'Banner Name is required.';
    }
    if (name === 'link' && (!value)) {
      return 'Link is required.';
    }
    if (name === 'texts' && (!Array.isArray(value) || value.length === 0 || value.some(text => text.trim() === ''))) {
      return 'At least one valid text is required.';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    newErrors.name = validateField('name', form.name || '');
    newErrors.link = validateField('link', form.link || '');
    newErrors.texts = validateField('texts', form.texts || []);
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Xác thực ngay khi thay đổi
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleTextChange = (index: number, value: string) => {
    const newTexts = [...(form.texts || [])];
    newTexts[index] = value;
    setForm({ ...form, texts: newTexts });

    // Xác thực ngay khi thay đổi
    const error = validateField('texts', newTexts);
    setErrors({ ...errors, texts: error });
  };

  const addText = () => {
    setForm({ ...form, texts: [...(form.texts || []), ''] });
  };

  const handleEdit = (id: number) => {
    const bannerToEdit = banners.find(banner => banner.id === id);
  
    if (!bannerToEdit) {
      alert('Banner not found.');
      return;
    }
  
    setForm(bannerToEdit); // Populate the form with the selected banner data
    setIsEditing(true); // Indicate editing mode
    setIsPopupOpen(true); // Open the popup for editing
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this banner?');
    
    if (confirmDelete) {
      setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
      alert('Banner deleted successfully.');
    }
  };  

  const handleSubmit = () => {
    if (!validateForm()) {
      alert('Please fix the errors before submitting.');
      return;
    }

    if (isEditing && form.id) {
      setBanners(banners.map(b => (b.id === form.id ? { ...b, ...form } : b)));
    } else {
      const newBanner: Banner = {
        id: banners.length + 1,
        order: (banners.length + 1).toString().padStart(2, '0'),
        name: form.name!,
        link: form.link!,
        texts: form.texts || [],
        date: new Date().toISOString().split('T')[0],
        image: form.image || 'https://via.placeholder.com/100',
      };
      setBanners([...banners, newBanner]);
    }

    setForm({ texts: [''] });
    setIsEditing(false);
    setIsPopupOpen(false);
    setErrors({});
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];  // Lấy file đầu tiên được chọn
    if (file) {
      // Tạo URL cho file hình ảnh đã chọn
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, image: imageUrl });  // Cập nhật trạng thái với URL hình ảnh
    }
  };
  

  const openPopup = () => {
    setIsPopupOpen(true);
    setForm({ texts: [''] }); // Reset form
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="App">
      <div className="button-add">
        <button onClick={openPopup}>Add +</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Banner ID</th>
            <th>Order</th>
            <th>Banner Name</th>
            <th>Link</th>
            <th>Texts</th>
            <th>Registration Date</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {banners.map(banner => (
            <tr key={banner.id}>
              <td>{banner.id}</td>
              <td>{banner.order}</td>
              <td>{banner.name}</td>
              <td>{banner.link}</td>
              <td>{banner.texts.join(', ')}</td>
              <td>{banner.date}</td>
              <td><img src={banner.image} alt="banner" width="200" /></td>
              <td><button className="button1" onClick={() => handleEdit(banner.id)}>Edit</button></td>
              <td><button className="button2" onClick={() => handleDelete(banner.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
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
                onChange={handleImageChange}
              />
            </label>

            <div className="btn-container">
              <button onClick={closePopup}>Close</button>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
