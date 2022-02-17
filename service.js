// service.js
import TrackPlayer, { Event } from "react-native-track-player";

module.exports = async function playerService() {
    TrackPlayer.addEventListener(Event.RemoteDuck, () => TrackPlayer.pause());
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
    TrackPlayer.addEventListener(Event.RemoteNext, () =>
        TrackPlayer.skipToNext()
    );
    TrackPlayer.addEventListener(Event.RemotePrevious, () =>
        TrackPlayer.skipToPrevious()
    );
};

