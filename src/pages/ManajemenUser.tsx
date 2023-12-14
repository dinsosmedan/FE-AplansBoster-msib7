import { Container, Loading, Pagination, Search } from '@/components'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useForm } from 'react-hook-form'
import * as React from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import useTitle from '@/hooks/useTitle'
import {
  useDeleteUser,
  useGetUserById,
  useGetUsers
} from '@/store/server/useUserManagement'
import { userValidation, type userFields } from '@/lib/validations/user.validation'
import { yupResolver } from '@hookform/resolvers/yup'

const ManajemenUser = () => {
  useTitle('Manajemen User ')

  const { isLoading } = useGetUsers()

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
  const { isLoading: isLoadingDelete } = useDeleteUser()
  const { data: user, isSuccess, isLoading: isLoadingUser } = useGetUserById()

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

  // const handleDeleteUser = (id: string) => {
  //   void alert({
  //     title: 'Hapus User',
  //     description: 'Apakah kamu yakin ingin menghapus data ini?',
  //     variant: 'danger',
  //     submitText: 'Delete'
  //   }).then(async () => {
  //     await deleteUser(id)
  //   })
  // }

  if (isLoading && isLoadingDelete && isLoadingUser) {
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
            <TableHead className="text-center text-white">NIK</TableHead>
            <TableHead className="text-center text-white">Nama</TableHead>
            <TableHead className="text-center text-white">Email</TableHead>
            <TableHead className="text-center text-white">No. HP</TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">Active</TableCell>
            <TableCell className="flex justify-center items-center">
              <Button
                size="icon"
                variant="base"
                className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
              >
                <HiOutlinePencilAlt className="text-lg" />
              </Button>
              {/* <Button
                size="icon"
                variant="base"
                className="bg-red-500 text-white hover:bg-red-300 hover:text-white ms-2"
                onClick={() => handleDeleteUser(item.id)}
              >
                <HiTrash className="text-lg" />
              </Button> */}
            </TableCell>
          </TableRow>
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
