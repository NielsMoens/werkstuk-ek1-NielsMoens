export default `
<header class="head">
    <ul class="head__nav">
        <li><a href="{{checkin.logout}}"><i class="fas fa-long-arrow-alt-left"></i></i></a></li>
        <li><a href="/visitorDashboard/profileInfo">{{checkin.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1 class="head__title">{{checkin.title}}</h1>
    <p class="head__subtitle">{{checkin.subtitle}}</p>
</header>

<div class="checkinScanner">
   <h2 class="checkinScanner__title"> {{checkin.info}}</h2>
</div>
`;