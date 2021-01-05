export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{checkin.logout}}"><i class="fas fa-long-arrow-alt-left"></i></i></a></li>
        <li><a href="/visitorDashboard/profileInfo">{{checkin.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{checkin.title}}</h1>
    <p class="subtitle__businessDash">{{checkin.subtitle}}</p>
</header>

<div class="busDashboard">
   <h2> {{checkin.info}} </h2>
</div>
`;