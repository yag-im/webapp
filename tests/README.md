# Test cases

1. Unauthenticated user tries to play a game
    - SignIn dialog should be shown
        - User authenticates
            - Continue with scenarios 2 and 3

2. Authenticated user has no orphaned sessions and opens a new game
    - Gameplay starts
        - User exits a game from a game menu
            -> Game closes
            -> Page should look as it was just opened (play button is visible, normal cursor etc)
        - User long-presses Esc
            -> Exit Game confirmation dialog should be shown
                - User decides to continue playing in a full-screen mode
                    -> Game continues to play
                - User decides to close the game
                    -> Game closes
                    -> Page should look as it was just opened (play button is visible, normal cursor etc)

3. Authenticated user has orphaned sessions and opens a new game
    - Orphaned session dialog should be shown
        - User chooses to close an orphaned session
            -> New game should start playing
                - Continue with scenario 2
        - User chooses to continue playing an orphaned session
            -> Orphaned game should start playing
                - Continue with scenario 2
