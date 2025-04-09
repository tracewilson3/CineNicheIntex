import { useState } from 'react';
import { User } from '../types/user';
import { updateUser } from '../api/UserAPI';

interface EditUserFormProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
  
}

const EditUserForm = ({ user, onSuccess, onCancel }: EditUserFormProps) => {
  const [formData, setFormData] = useState<User>({ ...user });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'zip' ? parseInt(value) || 0 : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked ? 1 : 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(formData.user_id, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Edit User</h2>
      <div className="form-grid">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
        <label>
          Zip:
          <input type="number" name="zip" value={formData.zip} onChange={handleChange} />
        </label>

        {/* Streaming Services */}
        <fieldset className="streaming-checkboxes">
          <legend>Streaming Subscriptions</legend>
          {[
            'Netflix',
            'Amazon_Prime',
            'DisneyPlus',
            'ParamountPlus',
            'Max',
            'Hulu',
            'AppleTVPlus',
            'Peacock'
          ].map((service) => (
            <label key={service}>
              <input
                type="checkbox"
                name={service}
                checked={!!formData[service as keyof User]}
                onChange={handleCheckboxChange}
              />
              {service}
            </label>
          ))}
        </fieldset>

        <button type="submit" className="btn btn-primary mt-2">Save</button>
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditUserForm;
