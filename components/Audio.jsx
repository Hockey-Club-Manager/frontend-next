import {useEffect, useState} from "react";
import soundfile from "../sounds/nft hockey menu.mp3";

// Хук принимает url и запускает звук
export const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );
    // Если звук закончился, отключает его
    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

// Плеер в настройках
export const Player = () => {
    const [playing, toggle] = useAudio(soundfile);
    return (
        <div>
            <button onClick={toggle}>{playing ? "OFF" : "ON"}</button>
        </div>
    );
};