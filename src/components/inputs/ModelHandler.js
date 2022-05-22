export const ModelHandler = (props) => {
    return (

        <div className='position-absolute top-0 start-0 mt-5 ms-5 text-center bg-light border border-primary'>
            <label htmlFor="meshFile" className="form-label text-primary mt-1">Choose a model:</label>
            <input className="form-control mt-1" type="file" accept=".gltf, .glb, .obj" id="meshFile" onChange={(event) => props.modelHandler(event)} />
        </div>
    )
}