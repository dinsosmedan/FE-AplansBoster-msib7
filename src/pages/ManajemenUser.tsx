import { Container, Loading, Pagination, Search } from '@/components'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useForm } from 'react-hook-form'
import * as React from 'react'
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi'
import useTitle from '@/hooks/useTitle'
import {
  useDeleteUser,
  useGetUserById,
  useGetUsers
} from '@/store/server/useUserManagement'
import { userValidation, type userFields } from '@/lib/validations/user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAlert } from '@/store/client'
// import { useNavigate } from 'react-router-dom'

const ManajemenUser = () => {
  useTitle('Manajemen User ')
  // const navigate = useNavigate()
  const { alert } = useAlert()

  const { data: users, isLoading } = useGetUsers()

  const forms = useForm<userFields>({
    mode: 'onTouched',
    resolver: yupResolver(userValidation),
    defaultValues: {
      employeeIdentityNumber: '',
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      role: '',
      isActive: ''
    }
  })

  const [currentPage, setCurrentPage] = React.useState(1)
  const { data: user, isSuccess, isLoading: isLoadingUser } = useGetUserById()
  const { mutateAsync: deleteUser, isLoading: isLoadingDelete } = useDeleteUser()

  React.useEffect(() => {
    if (isSuccess && user) {
      forms.reset({
        employeeIdentityNumber: user?.employeeIdentityNumber,
        email: user?.email,
        name: user?.name,
        phoneNumber: user?.phoneNumber,
        password: '',
        role: user?.role.id,
        isActive: user?.isActive
      })
    }
  }, [isSuccess, user])

  const handleDeleteUser = (id: string) => {
    void alert({
      title: 'Hapus User',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteUser(id)
    })
  }

  if (isLoading || isLoadingDelete || isLoadingUser) {
    return <Loading />
  }
  return (
    <Container>
      <div className="flex items-center mb-[18px]">
        <Search placeholder="Search" className="w-[398px] py-[23px]" />
      </div>

      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">NIK</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">No. HP</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.length !== 0 ? (
            users?.data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-semibold">{item.identityNumber || '-'}</TableCell>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="text-center">{item.email || '-'}</TableCell>
                <TableCell className="text-center">{item.phoneNumber || '-'}</TableCell>
                <TableCell className="text-center">{item.role?.name || 'Guest'}</TableCell>
                <TableCell>
                  <div
                    className={`${
                      item.isActive ? '[#E9FFEF]' : '[#FFD6E1]'
                    } rounded-full flex items-center w-fit gap-2 py-1 px-2 mx-auto`}
                  >
                    <div className={`w-2 h-2 rounded-full bg-${item.isActive ? '[#409261]' : 'red-500'}`} />
                    <p className={`text-${item.isActive ? '[#409261]' : 'red-500'} text-xs`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="base"
                    className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
                  >
                    <HiOutlinePencilAlt className="text-lg" />
                  </Button>
                  <Button
                    size="icon"
                    variant="base"
                    className="bg-red-500 text-white hover:bg-red-300 hover:text-white ms-2"
                    onClick={() => handleDeleteUser(item.id)}
                  >
                    <HiTrash className="text-lg" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        className="px-5 py-5 flex justify-end"
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  )
}
export default ManajemenUser
