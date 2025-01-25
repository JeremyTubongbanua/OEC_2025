import AdminForm from '@/components/forms/AdminForm';

export default function AdminPage() {
   return (
      <div className="my-10">
         <h1 className="text-center text-2xl font-bold text-blue-500 mb-10">
            Admin Page
         </h1>
         <AdminForm />
      </div>
   );
}
