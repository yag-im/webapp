import { getQueryClient } from "@/query-client/query-client-utils";

declare global {
    interface Document {
        webkitFullscreenElement: () => void;
        webkitFullscreenEnabled: boolean;
        mozFullScreenElement: () => void;
        mozFullScreenEnabled: boolean;
        msFullscreenElement: () => void;
        msFullscreenEnabled: boolean;
        mozExitPointerLock: () => void;
        webkitExitPointerLock: () => void;
    }

    interface Navigator {
        keyboard: {
            lock: () => void;
            unlock: () => void;
            onshow: () => void;
            onhide: () => void;
        };
    }
}

export interface UserProfileProps {
    dob: string;
    email: string;
    name: string;
    tz: string;
}

export async function getUserProfile() {
    const queryClient = getQueryClient();
    const userProfile: UserProfileProps = await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await fetch(`/api/accounts/user`);
            if (!response.ok) {
                return null;
            }
            const response_json = await response.json() as UserProfileProps;
            return response_json;
        },
    });
    return userProfile;
}

export function requestPointerLockWithoutUnadjustedMovement(target_el: any) {
    const promise = target_el.requestPointerLock({
        unadjustedMovement: false
    });
    if (!promise) return;
    return promise
        .then(() => { 
            console.log("[GamePlayer] pointer is locked without unadjusted movement");
        })
        .catch((error: { message: any; }) => {
            console.warn(
                `[GamePlayer] pointer can't be locked without unadjusted movement: "${error.message}"`
            );
        });
}

export function requestPointerLockWithUnadjustedMovement(target_el: any) {
    const promise = target_el.requestPointerLock({
        unadjustedMovement: true
    });
    if (!promise) {
        console.warn("[GamePlayer] disabling mouse acceleration not supported");
        return;
    }
    return promise
        .then(() => {
            console.log("[GamePlayer] pointer is locked with unadjusted movement");
        })
        .catch((error: { message: any; name: string; }) => {
            console.warn(
                `[GamePlayer] pointer can't be locked with unadjusted movement: "${error.message}"`
            );
            if (error.name === "NotSupportedError") {
                // Some platforms may not support unadjusted movement.
                // You can request again a regular pointer lock.
                return requestPointerLockWithoutUnadjustedMovement(target_el);
            }
        });
}

export function lockPointer(el: any) {
    document.addEventListener("pointerlockchange", () => {
        if (document.pointerLockElement) {
            console.log(`[GamePlayer] pointer is locked on ${document.pointerLockElement.id} element`);
        } else {
            console.log("[GamePlayer] pointer is unlocked");
        }
    });
    document.addEventListener("pointerlockerror", () => {
        console.error("[GamePlayer] pointer lock error");
    });
    requestPointerLockWithUnadjustedMovement(el);
}

export function exitPointerLock() {
    document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;
    document.exitPointerLock();
}

export function isFullScreen() {
    return Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}

export function requestFullscreen(el: any, onExitFullscreen: () => void) {
    console.log("[GamePlayer] entering requestFullscreen");
    document.addEventListener('fullscreenchange', (event) => {
        if (isFullScreen()) {
            console.log("[GamePlayer] entered fullscreen mode");
        } else {
            console.log("[GamePlayer] exited fullscreen mode");
            onExitFullscreen();
        }
    });
    if (isFullScreen()) return false;
    if (el === undefined) el = document.documentElement;
    // Test for the existence of document.fullscreenEnabled instead of requestFullscreen()
    if (document.fullscreenEnabled) {
        el.requestFullscreen();
    } else if (document.webkitFullscreenEnabled) {
        el.webkitRequestFullscreen();
    } else if (document.mozFullScreenEnabled) {
        el.mozRequestFullScreen();
    } else if (document.msFullscreenEnabled) {
        el.msRequestFullscreen();
    }
    console.log("[GamePlayer] switched to the fullscreen mode");
}

export async function exitFullscreen() {
    if (isFullScreen()) { await document.exitFullscreen(); }
}

export function lockKeyboard() {
    console.log("[GamePlayer] requesting a keyboard lock");
    if ('keyboard' in window.navigator && 'lock' in window.navigator.keyboard) {
        window.navigator.keyboard.lock();
        console.log("[GamePlayer] keyboard should be locked now");
    }
}

export function hideCursor() {
    // hide system cursor so it doesn't interfere with the native in-game cursor
    console.log("hide cursor called");
    document.body.style.cursor = 'none';
}

export function showWaitCursor() {
    console.log("[GamePlayer] entering setWaitCursor");
    document.body.style.cursor = 'wait';
}

export function showDefaultCursor() {
    console.log("[GamePlayer] entering setDefaultCursor");
    document.body.style.cursor = 'default';
}
