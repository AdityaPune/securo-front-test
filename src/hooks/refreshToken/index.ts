import { getToken } from "../../services/axios/refreshToken";
import { useDispatch } from "react-redux";
import { updateInactivityStatus } from "../../store/slices/inactivity-slice";

let time: any;
let initialTime = new Date();

function useRefreshTokens() {

    async function refreshToken() {
        if (localStorage.getItem("user") !== null) {
            let response = await getToken();
            let token = response.data.data.access_token;
            localStorage.setItem("access_token", token);

            //console.log("access token stored", token);
        }
    }

    function refresher() {
        clearInterval(time);
        // time = setInterval(refreshToken, 600 * 1000); //10 seconds
        //console.log("initial time", initialTime);
        let checkSessionTimeout = () => {
            var minutes = Math.abs((initialTime.valueOf() - (new Date()).valueOf()) / 1000 / 60);
            if (minutes > 10) {
                initialTime = new Date();
                refreshToken();
            }
        };
        time = setInterval(checkSessionTimeout, 1000 * 2);
    }

    refresher()

}

function useOnPageRefresh() {

    let dispatch = useDispatch()

    async function onPageRefresh() {
        if (localStorage.getItem("user") !== null) {
            try {
                let response = await getToken();
                if (response.status !== 401) {
                    let token = response.data.data.access_token;
                    localStorage.setItem("access_token", token);
                    initialTime = new Date();
                    // console.log("access token stored on Page refresh", token);
                }
            } catch (e) {
                console.log("error", e);
                dispatch(updateInactivityStatus(true))
            }
        }
    }

    onPageRefresh()
}

export { useRefreshTokens, useOnPageRefresh };