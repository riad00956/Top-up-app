function copyNumber(number) {
  navigator.clipboard.writeText(number);
  alert(number + ' কপি করা হয়েছে');
}

function signup() {
  const user = document.getElementById('newUsername').value;
  const pass = document.getElementById('newPassword').value;
  if (user && pass) {
    localStorage.setItem('user_' + user, pass);
    alert('সাইন আপ সফল!');
    window.location.href = 'login.html';
  }
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (localStorage.getItem('user_' + user) === pass || (user === 'admin' && pass === 'admin123')) {
    localStorage.setItem('current_user', user);
    alert('লগইন সফল!');
    window.location.href = user === 'admin' ? 'admin.html' : 'user.html';
  } else {
    alert('ভুল তথ্য');
  }
}

function submitOrder() {
  const uid = document.getElementById('uid').value;
  const pack = document.getElementById('package').value;
  const trxid = document.getElementById('trxid').value;
  const user = localStorage.getItem('current_user');
  if (!user) {
    alert('প্রথমে লগইন করুন');
    return;
  }
  const order = { user, uid, pack, trxid, time: new Date().toLocaleString() };
  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  alert('অর্ডার সম্পন্ন হয়েছে!');
  window.location.href = 'user.html';
}

window.onload = () => {
  const user = localStorage.getItem('current_user');
  const path = location.pathname.split('/').pop();
  if (path === 'user.html' || path === 'admin.html') {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const container = document.getElementById(path === 'admin.html' ? 'allOrders' : 'userOrders');
    const html = orders
      .filter(o => path === 'admin.html' || o.user === user)
      .map(o => `<div class='order'>
        <b>${o.user}</b> - UID: ${o.uid}, Pack: ${o.pack}, TrxID: ${o.trxid} <br/><small>${o.time}</small>
      </div>`).join('');
    container.innerHTML = html || '<p>কোনো অর্ডার নেই</p>';
  }
};