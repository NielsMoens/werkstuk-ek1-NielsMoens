export default `
<header class="head">
    <ul class="head__nav">
        <li><a href="{{uniqueCode.logout}}"><i class="fas fa-long-arrow-alt-left"></i></a></li>
        <li><a href="/businessProfile">{{uniqueCode.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1 class="head__title">{{uniqueCode.title}}</h1>
    <p class="head__subtitle">{{uniqueCode.subtitle}}</p>
</header>

<div class="unicode">
   <h2 class="unicode__title"> {{uniqueCode.info}} </h2>
</div>
`;