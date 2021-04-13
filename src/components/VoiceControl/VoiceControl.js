import { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './VoiceControl.module.scss';
import MicIcon from '@material-ui/icons/Mic';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const recognition = new SpeechRecognition();

export default function VoiceControl() {
  const history = useHistory();
  const [isListening, setListening] = useState(false);
  recognition.lang = 'en-US';
  const activeMicr = () => {
    recognition.start();
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.onresult = (ev) => {
    const command = ev.results[0][0].transcript;
    if (command.includes("home") || command.includes("go to home") || command.includes("back to home") || command.includes("home page")) {
      history.push('/');
    }
    if (command.includes("login") || command.includes("sign in") || command.includes("go to sign in") || command.includes("back to sign in") || command.includes("sign in page")) {
      history.push('/signin');
    }
    if (command.includes("register") || command.includes("sign up") || command.includes("go to sign up") || command.includes("back to sign up") || command.includes("sign up page")) {
      history.push('/signup');
    }
    if (command.includes("upload") || command.includes("go to upload") || command.includes("back to upload") || command.includes("upload page")) {
      history.push('/upload');
    }

  }
  return (
    <>
      <div onClick={activeMicr} className={isListening ? styles.listening : styles.notListening}>
        <MicIcon />
      </div>
    </>
  )
}

