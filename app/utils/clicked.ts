const Clicked = (ele) => {
    try {
        ele.current.style.opacity = '0.3';
        setTimeout(() => ele.current.style.opacity = '1', 200);
    } catch (err) {
        ele.style.opacity = '0.3';
        setTimeout(() => ele.style.opacity = '1', 200);
    }
}

export default Clicked;