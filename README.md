# react-crud-app

learning react through project. Firebase integrated for DB support

📝 Key Code Comments & Optimizations
✅ 1. Why useReducer Instead of useState?
useReducer is better for managing complex state updates, like updating a list of users.
It prevents unnecessary re-renders compared to useState([]).
The reducer only updates specific parts of state instead of replacing the whole array.
✅ 2. Why Fetch Data Only Once in useEffect?
Fetching users from Firestore only when the component mounts avoids unnecessary API calls.
Without [], useEffect would run every render, causing multiple Firestore reads.
✅ 3. Why Update Local State Immediately?
Instead of re-fetching all users after each action, the reducer updates only the modified user.
This makes the UI faster and prevents unnecessary Firestore reads.
✅ 4. Why Add Input Validation Before Creating Users?
Prevents adding empty users (e.g., missing name/age/country).
Avoids unnecessary Firestore writes, which could lead to extra costs.
🚀 Final Takeaways
✅ More Efficient:

API calls only happen when necessary.
Local state updates instantly after CRUD actions.
✅ Better Readability & Maintainability:

Clear code comments make it easy to modify later.
useReducer simplifies state logic.
✅ Performance Boost:

No unnecessary re-renders.
Minimal Firestore reads.
