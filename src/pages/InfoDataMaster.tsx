import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HiOutlineExclamationCircle } from "react-icons/hi2"
import { Link } from "react-router-dom"

const TableDataMaster = () => {
    return (
        <>
            <Table className="my-10">
                <TableHeader className="bg-primary">
                    <TableRow className="text-center">
                        <TableHead className="text-white">NIK</TableHead>
                        <TableHead className="text-white">Nama</TableHead>
                        <TableHead className="text-white">Jenis Bansos</TableHead>
                        <TableHead className="text-white">Tahun</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                    <TableRow className="text-center">
                        <TableCell className="">198608212009012001</TableCell>

                        <TableCell>Syamsul</TableCell>
                        <TableCell className="">KrisnaCuki</TableCell>

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

                        <TableCell>Syamsul</TableCell>
                        <TableCell className="">KrisnaCuki</TableCell>

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

                        <TableCell>Syamsul</TableCell>
                        <TableCell className="">KrisnaCuki</TableCell>

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

                        <TableCell>Syamsul</TableCell>
                        <TableCell className="">KrisnaCuki</TableCell>

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

                        <TableCell>Syamsul</TableCell>
                        <TableCell className="">KrisnaCuki</TableCell>

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

                        <TableCell>Syamsul</TableCell>
                        <TableCell className="">KrisnaCuki</TableCell>

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
const InfoDataMaster = () => {
    return (
        <>
            <div className="container bg-white py-10 flex-row flex-wrap grid grid-cols-4 gap-y-3">
                <div className="flex flex-col">
                    <p className="font-bold">No.KK</p>
                    <p>1271010708690003</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Kota</p>
                    <p>Medan</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Jenis Kelamin</p>
                    <p>Laki-Laki</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Kewarganegaraan</p>
                    <p>WNI</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">NIK</p>
                    <p>1271010708690003</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Kecamatan</p>
                    <p>Medan Belawan</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Pendidikan Terakhir</p>
                    <p>SLTA/SEDERAJAT</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Status Keluarga</p>
                    <p>Kepala Keluarga</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Nama</p>
                    <p>Ricky J Sianipar</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Kelurahan</p>
                    <p>Belawan</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Pekerjaan</p>
                    <p>Buruh</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Nama Ibu</p>
                    <p>Susanti</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Alamat</p>
                    <p>JLN STASIUN LORONG STASIUN NO 115</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Agama</p>
                    <p>Islam</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Golongan Darah</p>
                    <p>O</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Nama Bapak</p>
                    <p>Budi</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Umur</p>
                    <p>33</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Tempat,Tanggal Lahir</p>
                    <p>Medan,12/12/1992</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Status Kawin</p>
                    <p>Sudah Kawin</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Status</p>
                    <p>DTKS</p>
                </div>
            </div>
            <TableDataMaster />
        </>


    )
}

export default InfoDataMaster