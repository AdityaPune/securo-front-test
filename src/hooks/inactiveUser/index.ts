import { useDispatch } from "react-redux";
import { updateInactivityStatus } from "../../store/slices/inactivity-slice";

let time: any;

function useInactivityChecker() {

    let dispatch = useDispatch();

    // events
    window.onload = resetTime;
    window.onclick = resetTime;
    window.onkeypress = resetTime;
    window.ontouchstart = resetTime;
    window.onmousemove = resetTime;
    window.onmousedown = resetTime;
    window.addEventListener('scroll', resetTime, true);

    async function alertUser() {
        // do your task here
        if (localStorage.getItem("user") !== null) {
            dispatch(updateInactivityStatus(true))
        }
    }

    function resetTime() {
        clearTimeout(time);
        //console.log("inside reset time func")
        let initialTime = new Date();
        let checkSessionTimeout = () => {
            var minutes = Math.abs((initialTime.valueOf() - (new Date()).valueOf()) / 1000 / 60);
            if (minutes > 15) {
                initialTime = new Date();
                alertUser();
            }
        };
        time = setInterval(checkSessionTimeout, 1000);
    }

}

export { useInactivityChecker };