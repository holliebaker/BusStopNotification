# Bus Stop Notification

## Use case(s)
- User wants to be notified when their bus is due
- User wants to be notified when their stop is next
- User wants next stop announcements

## Requirements
- Given trip and stop identifiers (T and S), and a positive number M, send a notification when T is due to arrive at S in M minutes, using the tracking data
  - use bustimes.org/api/trips/trip_id
  - we receive an array of stops, one of which is my_stop.
  - identify the closest stop it passed. last one with non-empty track or non-null actual departure (not sure which is most reliable). call this stop cur_stop
  - calculate delta_t, expected time for my_stop - expected time for cur_stop. calculate expected_time as curr_stop actual departure plus delta_t, calculate countdown_minutes as current_time - expected_time.
  - poll the api (how often?) and repeat this culc every time curr_stop changes.
  - when countdown_minutes <= M, send user a notification. Have to be careful about rounding minutes, taking into account how often we poll.
  - for usability, we must set a minimum for M, based on poll interval and add one minute in case T is early (is the rule still one minute early?)
  - Note: expected time is now displayed by bustimes.org. see how they calculate
- Live stop announcements
  - poll the trips api again.
  - determine curr_stop in the same way as before.
  - announce next_stop. need to determine when the announcement should be made. e.g., min (M_0, delta_t) minutes from expected arrival time. M_0 is the min time, say 1 or 2 minutes.

## How it will bee used.
- user must specify S and T. T comes from the tracking URL. S is more difficult. can display a list from which the user picks, based on first call to trips api.
- if we do this, we get a list of upcoming stsops for T. user may choose to have announcements, so it calls and highlights next stop, or a notification for given stop.

## Gold plating
- Nice search.
  - I normally search by stop and find the trip I want that way.
  - why not have the app process the web request. to the tracking page? stop id comes from the URL of referrer. maybe it's possible to get that?

## Technologies?
- use react native if possible.
  - maybe type script?
- native things I need to do
  - very important: send notifications to the system
  - important: call to the text-to-speech engine
  - somewhat: intents for opening links. can get referrer url?

### First thing to implement

- Next stop: blabla.
  - user adds url
  - app extracts trip id
  - find trip by id. (error handling?)
  - find next stop, as above
  - display (maybe speak?)

How the thing works
- we have an array of stops
- if aimed_arrival_time, we have live updates
- otherwise, no.


## Notes

- GET /api/vehiclejourneys?trip=<trip_id>
- GET /vehicles.json?id=<v_id>
