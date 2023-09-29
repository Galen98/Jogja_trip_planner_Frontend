import React, { useEffect } from 'react';
function Footerfix() {
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    const deferredPrompt = event;
    showInstallButton(deferredPrompt);
  };

  const showInstallButton = (deferredPrompt) => {
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';
    installButton.addEventListener('click', () => {
      // Trigger the prompt
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        } else {
          console.log('User dismissed the PWA installation');
        }
        installButton.style.display = 'none';
      });
    });
  };
    return(
        <>        
  <footer className="py-3 my-4" >
  <center>
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><a href="/inspirasiperjalanan" class="nav-link px-2 text-muted">Inspirasi Perjalanan</a></li>
      <li className="nav-item"><a href="/aboutus" class="nav-link px-2 text-muted">About Us</a></li>
      <li className="nav-item"><a href="/faq" class="nav-link px-2 text-muted">FAQs</a></li>
      <li className="nav-item"><a href="/panduan" class="nav-link px-2 text-muted">Panduan Membuat Rencana Perjalanan</a></li>
    </ul>
    <p className="text-center text-muted">&copy; 2023 Jogja Trip Planner</p>
    <center><button id="install-button" className='btn btn-outline-dark custom-button-install rounded-9 text-capitalize' style={{ display: 'none' }}>
        Install This App
      </button> </center>
      </center>
  </footer>

        </>
    )
}
export default Footerfix