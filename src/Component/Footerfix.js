import Button from 'react-bootstrap/Button';
import React, { useEffect } from 'react';
function Footerfix() {
  useEffect(() => {
    // Register the event listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleBeforeInstallPrompt = (event) => {
    // Prevent the default prompt behavior
    event.preventDefault();

    // Store the event for later use
    // You can show a custom install button and trigger the prompt manually
    // when the user clicks on the custom button
    const deferredPrompt = event;

    // Show your custom install button and trigger the prompt manually
    showInstallButton(deferredPrompt);
  };

  const showInstallButton = (deferredPrompt) => {
    // Display your custom install button
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';

    // Handle the install button click event
    installButton.addEventListener('click', () => {
      // Trigger the prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        } else {
          console.log('User dismissed the PWA installation');
        }

        // Reset the install button display
        installButton.style.display = 'none';
      });
    });
  };
    return(
        <>
        <div className="container">
        
  <footer className="py-3 my-4">
  <center>
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><a href="#" class="nav-link px-2 text-muted">Inspirasi Perjalanan</a></li>
      <li className="nav-item"><a href="#" class="nav-link px-2 text-muted">About Us</a></li>
      <li className="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
      <li className="nav-item"><a href="#" class="nav-link px-2 text-muted">Panduan Membuat Rencana Perjalanan</a></li>
    </ul>
    <p className="text-center text-muted">&copy; 2023 Jogja Trip Planner</p>
    <center><button id="install-button" className='btn rounded-7 text-capitalize darkbtn text-capitalize' style={{ display: 'none' }}>
        Install This App
      </button> </center>
      </center>
  </footer>
</div>
        </>
    )
}
export default Footerfix