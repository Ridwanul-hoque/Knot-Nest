import React from 'react';

const BioCard = ({ item }) => {
    const { name, biodataType, profileImage, occupation, age } = item
    return (
        <div className='flex space-x-2'>
            <img  className='w-[100px]' src={profileImage} alt="" />
            <div>
                <h3 className='uppercase'>{name}</h3>
                <p>Age: {age}</p>
            </div>
            <p className='text-yellow-500'>Gender: {biodataType}</p>
            <p className='text-yellow-500'>Profession: {occupation}</p>


           
            
        </div>
    );
};

export default BioCard;