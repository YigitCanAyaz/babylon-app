export const ThirdAnimationButton = (props) => {
    return (
        <div className='col-md'>
            <button style={{ "height": "50px", "width": "200px" }} type="button" className="bg-light text-dark border border-primary ms-5" onClick={() => props.thirdAnimationButton()}>Third Animation</button>
        </div>
    )
}