import { createTraining } from '@/lib/action/events/add-training';
import React from 'react';

const NewTrainingPage = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <form action={createTraining} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            name="title"
            id="title"
            placeholder="Title..."
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Color
          </label>
          <input
            name="color"
            id="color"
            placeholder="Color..."
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium">
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            placeholder="Duration..."
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Description..."
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <input
            name="category"
            id="category"
            placeholder="Category..."
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="active" className="block text-sm font-medium">
            Active
          </label>
          <select
            name="active"
            id="active"
            className="select select-bordered w-full"
            defaultValue="true"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Training
        </button>
      </form>
    </div>
  );
};

export default NewTrainingPage;
