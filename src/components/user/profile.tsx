"use client"; 
import { useSession } from "next-auth/react";
import SingnOut from "./SingnOut";
import Loading from "../loading";

const Profile = () => {
  const { data: session, status } = useSession();

  // Inicio del bloque de información del usuario
  return<>
    <div className='w-full h-[70vh] xl:h-[86vh]'>
      <div className='pt-5 px-5 md:px-10 lg:px-20 h-full pb-5'>
        <div className='h-full' >
          <div className='w-full h-full'>
              <div className='w-full h-full bg-white dark:bg-gray-800 p-5 rounded-xl relative'>
                {status === "loading" ? 
                  <Loading /> : 
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-h-full relative mt-4">
                      <div className="md:col-span-3">
                        <div className="mb-5 w-full">
                        <img src={`http://localhost:8080/files/${session?.user?.photo}`} alt="Photo" className='w-32 h-32 rounded-full mx-auto'/>
                          <h2 className='text-center text-2xl font-bold mt-4'>{session?.user?.name} {session?.user?.secondName} {session?.user?.lastName} {session?.user?.secondLastName}</h2>
                          <p className='text-center text-gray-500 mb-5'>{session?.user?.email}</p>
                          <div><SingnOut /></div>
                        </div>
                      </div>
                      <div className="md:col-span-9">
                        <div className="mb-5 w-full">
                          <p className="mb-2"><strong>{session?.user?.identificationType}:</strong>  {session?.user?.identificationNumber}</p>
                          <p className="mb-2"><strong>Rol:</strong> {session?.user?.rol}</p>
                          <p className="mb-2"><strong>Teléfono:</strong> {session?.user?.phone}</p>
                          <p className="mb-2"><strong>Género:</strong> {session?.user?.gender}</p>
                        </div>
                      </div>
                    </div>
                  </>}
              </div>
          </div>
        </div>
      </div>
    </div>
  </>
  // Fin del bloque de información del usuario
};

export default Profile;
