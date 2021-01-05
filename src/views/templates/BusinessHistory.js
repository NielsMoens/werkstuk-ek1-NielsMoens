export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{busHistory.logout}}"><i class="fas fa-long-arrow-alt-left"></i></a></li>
        <li><a href="/businessDashboard/profileInfo">{{busHistory.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{busHistory.title}}</h1>
    <p class="subtitle__visitorDash">{{busHistory.subtitle}}</p>
</header>

<div class="visitor_dashboard">
    <h2> {{busHistory.info}} </h2>
</div>
`;