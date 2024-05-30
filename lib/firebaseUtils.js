import { db } from "@/firebase.config";
import { collection, getDocs, query,getDoc, doc,updateDoc, deleteDoc } from "firebase/firestore"


export const getCollection = async (events) => {
    const querySnapshot = await getDocs(query(collection(db, events)))
    const data = []
    querySnapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() })
    })

    return data
}


export const getDocumentById = async (events, id) => {
  const docRef = doc(db, events, id);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
};

// Book event
export const bookEvent = async (userEmail, eventId) => {
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);

  if (eventDoc.exists()) {
    const eventData = eventDoc.data();
    let attendees = eventData.attendees || [];
    const availableSeats = parseInt(eventData.seats, 10) - attendees.length; // Parse seats to a number

    if (isNaN(availableSeats)) {
      console.error('Invalid number of seats');
      throw new Error('Invalid number of seats');
    }

    if (availableSeats > 0) {
      attendees.push(userEmail);
      console.log(userEmail)
      await updateDoc(eventRef, { attendees: attendees.filter(a => a) }) // Ensure attendees is not undefined
        .catch(error => {
          console.error('Error updating document:', error);
        });
    } else {
      console.error('No seats available');
      throw new Error('No seats available');
    }
  } else {
    console.error('Event not found');
    throw new Error('Event not found');
  }
};

// Canel booking
export const cancelBooking = async (userEmail, eventId) => {
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);

  if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      let attendees = eventData.attendees || [];
      const index = attendees.indexOf(userEmail);

      if (index > -1) {
          attendees.splice(index, 1);
          await updateDoc(eventRef, { attendees });
      } else {
          throw new Error('No booking found');
      }
  } else {
      throw new Error('Event not found');
  }
};
