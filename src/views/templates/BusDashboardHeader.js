export default `
<header class="head">
  <ul class="head__nav">
    <li><a href="{{busDashboard.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
    <li><a href="/businessDashboard/profileInfo">{{busDashboard.UserName}} <i class="fas fa-user"></i></a></li>
  </ul>
  <h1 class="head__title">{{busDashboard.title}}</h1>
  <p class="head__subtitle">{{busDashboard.subtitle}}</p>
</header>

<div class="businessDashboard">
  <ul class="businessDashboard__items">
    <li class="businessDashboard__item">
      <a class="businessDashboard__icon" href="/businessDashboard/uniquecode">
        <i class="fas fa-qrcode icon__highlighted"></i>
        <p>create QR-code</p>
      </a>
    </li>
    <li class="businessDashboard__item">
      <a class="businessDashboard__icon" href="/businessDashboard/Activevisitor">
        <i class="fas fa-users icon__highlighted"></i>
        <p>Active visitors</p>
      </a>
    </li>
    <li class="businessDashboard__item">
      <a class="businessDashboard__icon" href="/BusinessDashboard">
        <i class="fas fa-map-marked-alt"></i>
        <p>History</p>
      </a>
    </li>
    <li class="businessDashboard__item">
      <a class="businessDashboard__icon" href="/businessDashboard/profileInfo">
        <i class="fas fa-edit"></i>
        <p>Edit Business Info</p>
      </a>
    </li>
  </ul>
</div>
`;