import { Search } from "@/components"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HiOutlineExclamationCircle, HiPlus } from "react-icons/hi2"
import { Link } from "react-router-dom"
const TableDataMaster = () => {
  return (
    <>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="text-center">
            <TableHead className="text-white">NIK</TableHead>
            <TableHead className="text-white">No.KK</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Kecamatan</TableHead>
            <TableHead className="text-white">Kelurahan</TableHead>
            <TableHead className="text-white">Tahun</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">KrisnaCuki</TableCell>
            <TableCell className="">KrisnaPemai</TableCell>
            <TableCell className="">2023</TableCell>
            <TableCell className="">DTKS</TableCell>
            <TableCell className="">
              <Link to="/data-master/info-datamaster">
                <Button variant="base" size="icon">
                  <HiOutlineExclamationCircle className="h-7 w-7" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
const DataMaster = () => {
  return (
    <div className="container bg-white py-5">
      <div className="w-full flex flex-row justify-between">
        <Search placeholder="Search" className="h-[54px] w-1/3" />
        <Button className="bg-primary w-[159px] flex mx-auto rounded-xl py-8">
          <HiPlus className="w-6 h-6 text-white" />
          <p className="font-bold text-sm text-white">Tambah Data</p>
        </Button>
      </div>
      <div className="w-full flex flex-row gap-5 my-5">
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Kecamatan" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Kelurahan" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%]">
          <Select>
            <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent className="border-primary text-primary">
              <SelectItem value="m@example.com">Krisna Asu</SelectItem>
              <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
              <SelectItem value="m@support.com">The Little Krishna</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
      <TableDataMaster />
    </div>
  )
}

export default DataMaster