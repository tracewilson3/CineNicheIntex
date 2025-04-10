import { useState } from 'react';
import { User } from '../types/user';
import { addUser } from '../api/UserAPI';

interface NewUserFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewUserForm = ({ onSuccess, onCancel }: NewUserFormProps) => {
  const [formData, setFormData] = useState<Omit<User, 'user_id'>>({
    name: '',
    phone: '',
    email: '',
    age: 0,
    gender: '',
    Netflix: 0,
    Amazon_Prime: 0,
    DisneyPlus: 0,
    ParamountPlus: 0,
    Max: 0,
    Hulu: 0,
    AppleTVPlus: 0,
    Peacock: 0,
    city: '',
    state: '',
    zip: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0)
              : type === 'number' ? parseInt(value) || 0
              : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addUser(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Add New User</h2>
      <div className="form-grid">
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <label>Gender:
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
        </label>

        <fieldset>
          <legend>Streaming Services:</legend>
          <label><input type="checkbox" name="Netflix" checked={formData.Netflix === 1} onChange={handleChange} /> Netflix</label><br />
          <label><input type="checkbox" name="Amazon_Prime" checked={formData.Amazon_Prime === 1} onChange={handleChange} /> Amazon Prime</label><br />
          <label><input type="checkbox" name="DisneyPlus" checked={formData.DisneyPlus === 1} onChange={handleChange} /> Disney+</label><br />
          <label><input type="checkbox" name="ParamountPlus" checked={formData.ParamountPlus === 1} onChange={handleChange} /> Paramount+</label><br />
          <label><input type="checkbox" name="Max" checked={formData.Max === 1} onChange={handleChange} /> Max</label><br />
          <label><input type="checkbox" name="Hulu" checked={formData.Hulu === 1} onChange={handleChange} /> Hulu</label><br />
          <label><input type="checkbox" name="AppleTVPlus" checked={formData.AppleTVPlus === 1} onChange={handleChange} /> Apple TV+</label><br />
          <label><input type="checkbox" name="Peacock" checked={formData.Peacock === 1} onChange={handleChange} /> Peacock</label>
        </fieldset>

        <label>City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
        <label>Zip:
          <input type="number" name="zip" value={formData.zip} onChange={handleChange} />
        </label>

        <button type="submit" className="btn btn-success mt-2">Add User</button>
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default NewUserForm;
