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
  banner: Banner;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const BannerRow: React.FC<Props> = ({ banner, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{banner.id}</td>
      <td>{banner.order}</td>
      <td>{banner.name}</td>
      <td>{banner.link}</td>
      <td>{banner.texts.join(', ')}</td>
      <td>{banner.date}</td>
      <td><img src={banner.image} alt="banner" width="200" /></td>
      <td><button className="button1" onClick={() => onEdit(banner.id)}>Edit</button></td>
      <td><button className="button2" onClick={() => onDelete(banner.id)}>Delete</button></td>
    </tr>
  );
};

export default BannerRow;
