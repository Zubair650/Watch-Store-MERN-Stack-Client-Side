import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const image_token = import.meta.env.VITE_IMAGE;
const AddWatch = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_token}`

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const HandleAddWatch = async (event) => {
        event.preventDefault();

        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            try {
                const response = await axios.post(image_hosting_url, formData);

                console.log(response.data);

                const brand = event.target.brand.value;
                const price = event.target.price.value;
                const photo = response.data.data.display_url;
                const newWatch = { brand, price, photo }
                console.log(newWatch);

                fetch('http://localhost:5000/watches',
                {
                    method:'post',
                    headers:{'content-type':'application/json'},
                    body: JSON.stringify(newWatch) 
                })
                .then(
                    Swal.fire({
                    icon: 'success',
                    title: 'Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                }))
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div className='m-5'>
            <h2 className='m-5 font-bold text-xl'>Add a Watch</h2>
            <form onSubmit={HandleAddWatch}>
                <div className="">
                    <span className='font-bold'>Watch: </span>
                    <input name="brand" type="text" placeholder="" className="file-input file-input-bordered w-full max-w-xs" required />
                </div><br></br>
                <div className="">
                    <span className='font-bold'>Price: </span>
                    <input name="price" type="number" placeholder="  (BDT)" className="file-input file-input-bordered w-full max-w-xs" required />
                </div><br></br>
                <div className="">
                    <span className='font-bold'>Photo: </span>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/*" onChange={handleImageSelect} />
                </div><br></br>
                <button className="btn btn-wide btn-primary ms-10">Add a Watch</button>
            </form>
        </div>
    );
};

export default AddWatch;