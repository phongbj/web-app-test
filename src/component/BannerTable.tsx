import React from 'react';
import BannerRow from './BannerRow';

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
  banners: Banner[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const BannerTable: React.FC<Props> = ({ banners, onEdit, onDelete }) => {
  return (
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
          <BannerRow key={banner.id} banner={banner} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default BannerTable;
