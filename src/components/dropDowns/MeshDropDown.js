export const MeshDropDown = () => {
    return (
        <div>
            <select className="form-select position-absolute top-50 start-0 w-auto ms-5 mb-5 border border-primary" aria-label="Default select example" id="meshDropDown" defaultValue={'DEFAULT'}>
                <option value="DEFAULT">Select a mesh:</option>
            </select>
        </div>
    )
}