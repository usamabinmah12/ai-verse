import Image from 'next/image';
import React from 'react';

const PromtTable = ({ promt }) => {
  const { description, thumbnail } = promt || {};

  return (
    <div className="flex flex-col items-center gap-4">
      <img
                                    src={promt.thumbnail}
                                    alt={promt.title}
                                    className="w-2/12"
                                />

      <h2>
        Description: {description}
      </h2>
    </div>
  );
};

export default PromtTable;