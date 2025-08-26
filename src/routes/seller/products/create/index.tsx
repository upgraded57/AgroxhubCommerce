import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { use, useState } from 'react'
import * as Yup from 'yup'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FaCircleInfo, FaRegTrashCan } from 'react-icons/fa6'
import { useCreateProduct, useGetProductCategories } from '@/api/product'
import useRegions from '@/hooks/use-regions'
import { UserContext } from '@/providers/UserContext'
import ErrorMessage from '@/components/error-message'
import { ProductUnits } from '@/assets/data'

export const Route = createFileRoute('/seller/products/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = use(UserContext).user
  const { mutateAsync: createProduct, isPending: isCreatingProduct } =
    useCreateProduct()

  const handleCreateProduct = async (values: typeof initialValues) => {
    const formData = new FormData()
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, String(values[key as keyof typeof values]))
      }
    }

    // append images
    if (images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image)
      })
    }

    await createProduct(formData).then(() => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.some(
            (key) => typeof key === 'string' && key.includes('Seller Products'),
          ),
      })
      navigate({ to: '/seller/products' })
    })
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Product description is required'),
    categoryId: Yup.string().required('Product category is required'),
    unitWeight: Yup.string().required('Product unit weight is required'),
    unitPrice: Yup.string().required('Product unit price is required'),
    quantity: Yup.string().required('Product available quantity is required'),
    unit: Yup.string().required('Product unit is required'),
    min_sellable_quantity: Yup.string()
      .required('Minimum sellable quantity is required')
      .min(1),
  })

  const initialValues = {
    name: '',
    description: '',
    categoryId: '',
    sellerId: user?.id,
    location: '',
    regionId: '',
    unitWeight: '',
    unitPrice: '',
    quantity: '',
    min_sellable_quantity: '',
    unit: '',
  }

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleCreateProduct,
  })

  const { isLoading: isLoadingProductCategories, data: productCategories } =
    useGetProductCategories()

  const [useDefaultLocation, setUseDefaultLocation] = useState(false)
  const handleUseDefaultLocation = () => {
    setUseDefaultLocation((prev) => !prev)
    if (user?.address) {
      formik.setFieldValue('location', user.address)
    }
  }

  const [useDefaultRegion, setUseDefaultRegion] = useState(false)
  const handleUseDefaultRegion = () => {
    if (user && user.regionId) {
      setUseDefaultRegion((prev) => !prev)
      formik.setFieldValue('regionId', user.regionId)
    }
  }

  const [images, setImages] = useState<Array<File>>([])

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const imgFiles = Array.from(files)
      setImages(imgFiles)
    }
  }

  const handleRemoveImg = (idx: number) => {
    const fileInput = document.getElementById('images') as HTMLInputElement
    const newImgArray = images.filter((_, i) => i !== idx)

    const newFileList = new DataTransfer()
    newImgArray.forEach((item) => {
      newFileList.items.add(item)
    })
    fileInput.files = newFileList.files
    setImages(newImgArray)
  }
  const { isLoadingRegions, regions, selectedRegion, setSelectedRegion } =
    useRegions()
  return (
    <>
      <h2 className="hidden md:block font-semibold text-2xl pb-2 border-b">
        CREATE PRODUCT
      </h2>

      {!user?.address && (
        <div role="alert" className="alert alert-warning mt-6 shadow-none">
          <FaCircleInfo />
          <span>
            Warning: Please update your profile address before creating a
            product!
          </span>
          <Link to="/user/account/edit" className="underline">
            Update Profile
          </Link>
        </div>
      )}

      <form className="my-6 w-full px-2" onSubmit={formik.handleSubmit}>
        <label htmlFor="name" className="block mb-6">
          <p className="text-sm uppercase">product name</p>
          <input
            {...formik.getFieldProps('name')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="name" />
        </label>

        <label htmlFor="description" className="block mb-6">
          <p className="text-sm uppercase">product description</p>
          <textarea
            {...formik.getFieldProps('description')}
            className="textarea textarea-bordered  w-full"
          />
          <ErrorMessage formik={formik} fieldName="description" />
        </label>

        <label htmlFor="unitPrice" className="block mb-6">
          <p className="text-sm uppercase">product unit price (ngn)</p>
          <input
            type="number"
            {...formik.getFieldProps('unitPrice')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="unitPrice" />
        </label>

        <label htmlFor="unit" className="block mb-6">
          <p className="text-sm uppercase">
            PRODUCT UNIT (KG, CRATES, LITERS, BAGS ETC)
          </p>
          <select
            className="select select-bordered min-w-full"
            {...formik.getFieldProps('unit')}
          >
            <option value="">-- Select Product Unit --</option>
            {ProductUnits.map((u, idx) => (
              <option value={u} key={idx}>
                {u}
              </option>
            ))}
          </select>
          <ErrorMessage formik={formik} fieldName="unit" />
        </label>

        <label htmlFor="unitWeight" className="block mb-6">
          <p className="text-sm uppercase">PRODUCT UNIT WEIGHT</p>
          <div className="relative flex items-center">
            <input
              {...formik.getFieldProps('unitWeight')}
              className="input input-bordered w-full"
            />
            {formik.values.unit ? (
              <p className="text-gray-400 absolute right-2 text-sm">
                kg per {formik.values.unit.toLowerCase()}
              </p>
            ) : (
              ''
            )}
          </div>
          <ErrorMessage formik={formik} fieldName="unitWeight" />
        </label>

        <label htmlFor="quantity" className="block mb-6">
          <p className="text-sm uppercase">PRODUCT QUANTITY AVAILABLE</p>
          <input
            type="number"
            {...formik.getFieldProps('quantity')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="quantity" />
        </label>

        <label htmlFor="min_sellable_quantity" className="block mb-6">
          <p className="text-sm uppercase">MINIMUN SELLABLE QUANTITY</p>
          <input
            type="number"
            {...formik.getFieldProps('min_sellable_quantity')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="min_sellable_quantity" />
        </label>

        <label htmlFor="categoryId" className="w-full block mb-6">
          <p className="text-sm uppercase">PRODUCT CATEGORY</p>
          <select
            className="select select-bordered min-w-full"
            {...formik.getFieldProps('categoryId')}
            disabled={isLoadingProductCategories}
          >
            <option value="">-- Select Product Category --</option>
            {productCategories?.map((item, idx) => (
              <option value={item.id} key={idx}>
                {item.name}
              </option>
            ))}
          </select>
          <ErrorMessage formik={formik} fieldName="categoryId" />
        </label>

        <div className="w-full block mb-6">
          <label htmlFor="location">
            <p className="text-sm uppercase">PRODUCT LOCATION</p>
            <input
              type="text"
              {...formik.getFieldProps('location')}
              className="input input-bordered w-full"
              disabled={useDefaultLocation}
            />
          </label>
          {user?.address && (
            <label
              htmlFor="useDefaultLocation"
              className="flex items-center gap-2 mt-2"
              onChange={handleUseDefaultLocation}
            >
              <input type="checkbox" id="useDefaultLocation" />
              <p className="text-sm">Use my default address ({user.address})</p>
            </label>
          )}
        </div>

        <div className="block mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <label htmlFor="state" className="block w-full">
              <p className="text-sm uppercase">PRODUCT STATE</p>
              <select
                className="select select-bordered min-w-full"
                defaultValue=""
                name="state"
                disabled={
                  isLoadingRegions ||
                  !regions ||
                  regions.length < 1 ||
                  useDefaultRegion
                }
                onChange={(e) =>
                  setSelectedRegion((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
              >
                <option value="">
                  {useDefaultRegion && user
                    ? user.region?.state
                    : '-- Select State --'}
                </option>
                <option value="Lagos">Lagos</option>
              </select>
            </label>

            <label htmlFor="lcda" className="block w-full">
              <p className="text-sm uppercase">PRODUCT LCDA</p>
              <select
                className="select select-bordered min-w-full"
                defaultValue=""
                name="lcda"
                disabled={
                  isLoadingRegions || !selectedRegion.state || useDefaultRegion
                }
                onChange={(e) =>
                  setSelectedRegion((prev) => ({
                    ...prev,
                    selectedLcda: e.target.value,
                  }))
                }
              >
                <option value="">
                  {useDefaultRegion && user
                    ? user.region?.lcda
                    : '-- Select Lcda --'}
                </option>
                {selectedRegion.lcda.map((item: string, idx: number) => (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="regionId" className="block w-full">
              <p className="text-sm uppercase">PRODUCT REGION</p>
              <select
                className="select select-bordered min-w-full"
                {...formik.getFieldProps('regionId')}
                disabled={
                  isLoadingRegions ||
                  !selectedRegion.selectedLcda ||
                  useDefaultRegion
                }
              >
                <option value="">
                  {useDefaultRegion && user
                    ? user.region?.name
                    : '-- Select Region --'}
                </option>
                {selectedRegion.region
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, idx) => (
                    <option value={item.id} key={idx}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <label
            htmlFor="defaultRegion"
            className="flex items-center gap-2 mt-2"
            onChange={handleUseDefaultRegion}
          >
            <input
              type="checkbox"
              name="defaultRegion"
              id="defaultRegion"
              disabled={!user?.regionId}
            />
            <p className="text-sm">
              Use my default region (State - {user?.region?.state}, LCDA -{' '}
              {user?.region?.lcda}, Region -{user?.region?.name})
            </p>
          </label>
        </div>

        <label htmlFor="images">
          <p className="text-sm uppercase">
            PRODUCT IMAGES (YOU CAN ADD MULTIPLE IMAGES)
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            maxLength={5}
            max={5}
            name="images"
            id="images"
            className="file-input file-input-bordered text-sm w-full max-w-md"
            onChange={handleUploadImages}
          />
        </label>

        {images.length > 0 && (
          <div className="flex items-center gap-2 mt-6">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="w-24 h-24 flex items-center justify-center rounded-md bg-black relative overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-full h-full object-cover hover:opacity-60 transition-opacity peer"
                  onClick={() => handleRemoveImg(idx)}
                />
                <FaRegTrashCan className="text-white text-lg absolute pointer-events-none hidden peer-hover:block" />
              </div>
            ))}
          </div>
        )}

        <div className="w-full flex justify-center mt-6">
          <button
            type="submit"
            className="btn btn-outline uppercase disabled:border-transparent disabled:text-gray-400 border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr"
            disabled={isCreatingProduct || !user?.address}
          >
            {isCreatingProduct ? (
              <span className="loading loading-dots loading-md bg-orange-clr" />
            ) : (
              'create product'
            )}
          </button>
        </div>
      </form>
    </>
  )
}
