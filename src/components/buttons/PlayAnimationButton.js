export const PlayAnimationButton = (props) => {
    return (
        <div className='position-absolute top-50 end-0 me-5 text-center'>
            <button style={{ "height": "50px", "width": "200px" }} type="button" className="bg-success text-light border border-success rounded" onClick={() => props.playAnimationButton()}>PLAY</button>
        </div>

    )
}