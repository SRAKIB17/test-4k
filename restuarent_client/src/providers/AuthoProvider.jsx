import React, { createContext, useEffect, useState } from 'react';
import useUrl from '../CustomHooks/URL/UseUrl';

export const AuthContext = createContext(null);
const AuthoProvider = ({ children }) => {
      const [error,setError]= useState('')
      const [url] = useUrl()
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            // const storedUser = localStorage.getItem('user');
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
                  setUser(JSON.parse(storedUser));
            }
            setLoading(false);
      }, []);

      const login = async (id) => {
            setLoading(true);

            const res = await fetch(`${url}/login`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ id: id }),
            });

            const responseData = await res.json();
            console.log(responseData);
          
           

            if (responseData.id ) {
                  setUser(responseData);
                
                  // Store user data in localStorage
                  // localStorage.setItem('user', JSON.stringify({id:responseData.id, name:responseData.name, role:responseData.role}));
                  sessionStorage.setItem('user', JSON.stringify({ id: responseData.id, name: responseData.name, role: responseData.role }));

            }
            else{
                  toast.error(responseData.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
            }

            setLoading(false);
      };

      const authInfo = {
            user,
            setUser,
            loading,
            login

      }

      return (
            <AuthContext.Provider value={authInfo}>
                  {children}
            </AuthContext.Provider>
      );
};

export default AuthoProvider;
