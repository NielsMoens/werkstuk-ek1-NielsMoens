export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{visData.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
        <li><a href="/businessProfile">{{visData.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{visData.title}}</h1>
    <p class="subtitle__businessDash">{{visData.subtitle}}</p>
</header>

<div class="busDashboard">
    <div class="mapbox">
       
        <a href="#">450 <br> Registered businesses</a>
    </div>
    <ul>
        <li>
            <a href="/visitorDashboard/CheckinScanner">
                <i class="fas fa-map-marked-alt"></i>
                <p>Check-in</p>
            </a>
        </li>
        <li>
            <a href="">
                <i class="fas fa-running"></i>
                <p>Check-out</p>
            </a>
        </li>
        <li>
            <a href="">
                <i class="fas fa-map-marked-alt"></i>
                <p>History</p>
            </a>
        </li>
        <li>
            <a href="">
                <i class="fas fa-edit"></i>
                <p>Edit User Info</p>
            </a>
        </li>     
    </ul>
</div>
`;