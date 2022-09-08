import '../app.scss'

function WhiteWrapper({ children } :{
    children: React.ReactNode;
}) {
    return <div id='white-wrapper'>
        {children}
    </div>
}

export default WhiteWrapper