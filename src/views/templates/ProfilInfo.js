export default `
<header class="head">
    <ul class="head__nav">
        <li><a href="{{profilInfo.logout}}"><i class="fas fa-long-arrow-alt-left"></i></a></li>
        <li><a href="/visitorDashboard/profileInfo">{{profilInfo.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1 class="head__title">{{profilInfo.title}}</h1>
    <p class="head__subtitle">{{profilInfo.subtitle}}</p>
</header>

<div class="profileInfo">
   <h2 class="profileInfo__title" > {{profilInfo.info}} </h2>
   <form action="POST">
    <input name="firstname" id="firstname" placeholder="{{profilInfo.firstname}}" type="text">
       <input name="lastname" id="lastname" placeholder="{{profilInfo.lastname}}" type="text">
       <input name="dateofbirth" id="dateofbirth" placeholder="{{profilInfo.dateofbirth}}" type="text">
       <input name="phonenum" id="phonenum" placeholder="{{profilInfo.phonenum}}" type="text">
   </form>
</div>
`;