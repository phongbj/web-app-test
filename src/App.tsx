import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerTable from './component/BannerTable';
import PopupForm from './component/PopupForm';

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

  const handleEdit = (id: number) => {
    const bannerToEdit = banners.find(banner => banner.id === id);
    if (bannerToEdit) {
      setForm(bannerToEdit);
      setIsEditing(true);
      setIsPopupOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this banner?');
    if (confirmDelete) {
      setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
      toast.success('Banner deleted successfully.');
    }
  };

  const handleSave = (newBanner: Banner, isEditing: boolean) => {
    if (isEditing) {
      setBanners(banners.map(b => (b.id === newBanner.id ? newBanner : b)));
      toast.success('Banner updated successfully.');
    } else {
      setBanners([...banners, { ...newBanner, id: banners.length + 1, order: (banners.length + 1).toString().padStart(2, '0') }]);
      toast.success('Banner created successfully.');
    }
    setIsPopupOpen(false);
    setForm({ texts: [''] });
  };

  const openPopup = () => {
    setForm({ texts: [''] });
    setIsEditing(false);
    setIsPopupOpen(true);
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="button-add">
        <button onClick={openPopup}>Add +</button>
      </div>
      <BannerTable banners={banners} onEdit={handleEdit} onDelete={handleDelete} />
      {isPopupOpen && (
        <PopupForm
          form={form}
          setForm={setForm}
          isEditing={isEditing}
          onSave={handleSave}
          onClose={() => setIsPopupOpen(false)}
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </div>
  );
};

export default App;
