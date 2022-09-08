import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import menus, { IMenuItem } from "../../constants/menu"

import './sidebar.scss'

function Menus() {
    const [path, setPath] = useState("");
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location])

    const handleNavigate = (path: string) => {
        navigate(path);
    }

    return <div className="menu-container-normal">
        {menus.map((m: IMenuItem, i: number) => {
            return m.disableFromSidebar ? null : <div className={`menu-container-item flex-row flex-align-center ${m.path.includes(path) ? 'selected' : ''}`}
                onClick={() => handleNavigate(m.path[0])} key={i}>
                <img src={m.path.includes(path) ? m.lightIcon : m.darkIcon} alt={path}
                    className={`menu-item-icon ${m.path.includes(path) ? 'icon-selected' : ''}`} />
                <span>{m.label}</span>
            </div>

            // return <div className={`menu-container-item flex-row flex-align-center selected`} onClick={() => setSelected(m.label)}>
            //     <img src={selected === m.label ? m.lightIcon : m.darkIcon} alt={m.label} className={`menu-item-icon ${selected === m.label ? 'icon-selected' : ''}`} />
            //     <span><a href={m.path}>{m.label}</a></span>
            // </div>
        })}
    </div>
}

export default Menus