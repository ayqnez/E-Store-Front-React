import React, { useState } from 'react';
import axios from 'axios';

const ProductFormSeparate = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    description: '',
    stock: '',
    screenSize: '',
    cpu: '',
    numberOfCores: '',
    mainCamera: '',
    frontCamera: '',
    batteryCapacity: '',
    memory: [], // как список checkbox
  });

  const [imageFile, setImageFile] = useState(null);
  const [largeImageFile, setLargeImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemoryChange = (value) => {
    setFormData((prev) => {
      const memories = prev.memory.includes(value)
        ? prev.memory.filter(m => m !== value)
        : [...prev.memory, value];
      return { ...prev, memory: memories };
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleLargeImageChange = (e) => {
    setLargeImageFile(e.target.files[0]);
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await axios.post('/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data; // путь к файлу
    } catch (err) {
      setMessage('Ошибка загрузки изображения');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedMainImg = await uploadImage(imageFile);
    const uploadedLargeImg = await uploadImage(largeImageFile);

    if (!uploadedMainImg || !uploadedLargeImg) return;

    setImageUrl(uploadedMainImg);
    setLargeImageUrl(uploadedLargeImg);

    const productData = {
      ...formData,
      imageUrl: uploadedMainImg,
      largeImageUrl: uploadedLargeImg,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };

    try {
      await axios.post('/api/products', productData);
      setMessage('Товар успешно создан');
      setFormData({
        name: '',
        category: '',
        brand: '',
        price: '',
        description: '',
        stock: '',
        screenSize: '',
        cpu: '',
        numberOfCores: '',
        mainCamera: '',
        frontCamera: '',
        batteryCapacity: '',
        memory: [],
      });
      setImageFile(null);
      setLargeImageFile(null);
      setImageUrl('');
      setLargeImageUrl('');
    } catch (err) {
      setMessage('Ошибка при создании товара');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Создание товара</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Название" value={formData.name} onChange={handleChange} required />
        <input name="category" placeholder="Категория" value={formData.category} onChange={handleChange} required />
        <input name="brand" placeholder="Бренд" value={formData.brand} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Цена" value={formData.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="В наличии" value={formData.stock} onChange={handleChange} required />

        <input name="screenSize" placeholder="Размер экрана" value={formData.screenSize} onChange={handleChange} />
        <input name="cpu" placeholder="Процессор" value={formData.cpu} onChange={handleChange} />
        <input name="numberOfCores" placeholder="Количество ядер" value={formData.numberOfCores} onChange={handleChange} />
        <input name="mainCamera" placeholder="Основная камера" value={formData.mainCamera} onChange={handleChange} />
        <input name="frontCamera" placeholder="Фронтальная камера" value={formData.frontCamera} onChange={handleChange} />
        <input name="batteryCapacity" placeholder="Батарея (мАч)" value={formData.batteryCapacity} onChange={handleChange} />

        <p>Память:</p>
        {['128GB', '256GB', '512GB', '1TB'].map(mem => (
          <label key={mem}>
            <input
              type="checkbox"
              checked={formData.memory.includes(mem)}
              onChange={() => handleMemoryChange(mem)}
            />
            {mem}
          </label>
        ))}

        <p>Главное изображение:</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <p>Большое изображение:</p>
        <input type="file" accept="image/*" onChange={handleLargeImageChange} />

        <button type="submit">Создать товар</button>
      </form>

      <p>{message}</p>
      {imageUrl && <img src={`/uploads/images/${imageUrl}`} alt="main" style={{ maxHeight: 100 }} />}
      {largeImageUrl && <img src={`/uploads/images/${largeImageUrl}`} alt="large" style={{ maxHeight: 100 }} />}
    </div>
  );
};

export default ProductFormSeparate;
