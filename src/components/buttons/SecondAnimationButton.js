export const SecondAnimationButton = (props) => {
    return (
        <div className='col-md'>
            <button style={{ "height": "50px", "width": "200px" }} type="button" className="bg-light text-dark border border-primary" onClick={() => props.secondAnimationButton()}>Second Animation</button>
        </div>

    )
}