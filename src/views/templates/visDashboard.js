export default `
<header class="head">
    <ul class="head__nav">
        <li><a href="{{visData.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
        <li><a href="/visitorDashboard/profileInfo">{{visData.UserName}}<i class="fas fa-user"></i></a></li>
    </ul>
    <h1 class="head__title">{{visData.title}}</h1>
    <p class="head__subtitle">{{visData.subtitle}}</p>
</header>

<div class="visitorDashboard">
    <ul class="visitorDashboard__items">
        <li class="visitorDashboard__item">
            <a class="visitorDashboard__icon" href="/visitorDashboard/CheckinScanner">
                <i class="fas fa-map-marked-alt icon__highlighted"></i>
                <p>Check-in</p>
            </a>
        </li>
        <li class="visitorDashboard__item" >
            <a class="visitorDashboard__icon" onclick="checkout()">
                <i class="fas fa-running icon__highlighted"></i>
                <p>Check-out</p>
            </a>
        </li>
        <li class="visitorDashboard__item">
            <a class="visitorDashboard__icon" href="/visitorDashboard/BusinessHistory">
                <i class="fas fa-map-marked-alt"></i>
                <p>History</p>
            </a>
        </li>
        <li class="visitorDashboard__item">
            <a class="visitorDashboard__icon" href="visitorDashboard/profileInfo">
                <i class="fas fa-edit"></i>
                <p>Edit User Info</p>
            </a>
        </li>     
    </ul>
</div>
`;