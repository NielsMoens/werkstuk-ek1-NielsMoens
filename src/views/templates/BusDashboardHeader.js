export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{busDashboard.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
        <li><a href="/businessDashboard/profileInfo">{{busDashboard.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{headerData.title}}</h1>
    <p class="subtitle__businessDash">{{busDashboard.subtitle}}</p>
</header>

<div class="busDashboard">
    <ul>
        <li>
            <a href="/businessDashboard/uniquecode">
                <i class="fas fa-qrcode"></i>
                <p>create QR-code</p>
            </a>
        </li>
        <li>
            <a href="/businessDashboard/Activevisitor">
                <i class="fas fa-users"></i>
                <p>Active visitors</p>
            </a>
        </li>
        <li>
            <a href="/">
                <i class="fas fa-map-marked-alt"></i>
                <p>History</p>
            </a>
        </li>
        <li>
            <a href="/businessDashboard/profileInfo">
                <i class="fas fa-edit"></i>
                <p>Edit Business Info</p>
            </a>
        </li>
    </ul>
</div>
`;