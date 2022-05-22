export const TextureHandler = (props) => {
    return (
        <div className='position-absolute top-0 end-0 mt-5 me-5 text-center bg-light border border-primary'>
            <label htmlFor="meshFile" className="form-label text-primary mt-1">Choose a texture:</label>
            <input className="form-control mt-1" type="file" accept=".png, .jpg, .jpeg" id="meshFile" onChange={(event) => props.textureHandler(event)} />
        </div>
    )
}