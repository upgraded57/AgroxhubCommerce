import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { use, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useQueryClient } from '@tanstack/react-query'
import {
  useGetProductCategories,
  useGetSingleProduct,
  useUpdateProduct,
} from '@/api/product'
import useRegions from '@/hooks/use-regions'
import { UserContext } from '@/providers/UserContext'
import Loader from '@/components/loader'
import ErrorMessage from '@/components/error-message'
import { ProductUnits } from '@/assets/data'

export const Route = createFileRoute('/seller/products/$slug/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  const slug = useParams({
    from: '/seller/products/$slug/edit/',
    select: (p) => p.slug,
  })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = use(UserContext).user
  const { data: product, isLoading } = useGetSingleProduct(slug)
  const { data: productCategories, isLoading: isLoadingProductCategories } =
    useGetProductCategories()

  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct(slug)

  const { isLoadingRegions, regions, selectedRegion, setSelectedRegion } =
    useRegions()

  const [useDefaultLocation, setUseDefaultLocation] = useState(false)
  const handleUseDefaultLocation = () => {
    setUseDefaultLocation((prev) => !prev)
    if (user?.address) {
      formik.setFieldValue('location', user.address)
    }
  }

  const [useDefaultRegion, setUseDefaultRegion] = useState(false)
  const handleUseDefaultRegion = () => {
    setUseDefaultRegion((prev) => !prev)
    if (user?.regionId) {
      formik.setFieldValue('regionId', user.regionId)
    }
  }

  const initialValues = {
    name: product?.name || '',
    description: product?.description || '',
    unitPrice: product?.unitPrice || '',
    unit: product?.unit || '',
    unitWeight: product?.unitWeight || '',
    quantity: product?.quantity || '',
    categoryId: product?.categoryId || '',
    location: product?.location || '',
    min_sellable_quantity: product?.min_sellable_quantity || '',
    low_stock_alert_level: product?.low_stock_alert_level || '',
    regionId: product?.regionId || '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Product description is required'),
    categoryId: Yup.string().required('Product category is required'),
    unitWeight: Yup.string().required('Product unit weight is required'),
    unitPrice: Yup.string().required('Product unit price is required'),
    quantity: Yup.string().required('Product available quantity is required'),
    unit: Yup.string().required('Product unit is required'),
    min_sellable_quantity: Yup.string().required(
      'Minimum sellable quantity is required',
    ),
    low_stock_alert_level: Yup.string().required(
      'Minimum sellable quantity is required',
    ),
  })

  const [images, setImages] = useState<Array<File | string>>([])

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const remainingUploadables = 4 - images.length
      const imgFiles = Array.from(files).slice(0, remainingUploadables)
      setImages((prev) => [...prev, ...imgFiles])
    }
  }

  const handleRemoveImg = (idx: number) => {
    const fileInput = document.getElementById('images') as HTMLInputElement
    const newImgArray = images.filter((_, i) => i !== idx)

    const newFileList = new DataTransfer()
    newImgArray.forEach((item) => {
      if (typeof item !== 'string') {
        newFileList.items.add(item)
      } else {
        const newImgs = images.filter((el) => el !== item)
        setImages(newImgs)
        return
      }
    })
    fileInput.files = newFileList.files
    setImages(newImgArray)
  }

  // Pre-Populate product images arrau
  useEffect(() => {
    const imagesArray =
      product?.images && product.images.length > 0 ? [...product.images] : []
    setImages(imagesArray)
  }, [product])

  const handleEditProduct = (values: typeof initialValues) => {
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
    updateProduct(formData).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['Product', slug],
      })
      navigate({ to: '/seller/products' })
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleEditProduct,
    enableReinitialize: true,
  })

  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      <h2 className="hidden md:block font-semibold text-2xl pb-2 border-b">
        CREATE PRODUCT
      </h2>

      <form className="my-6 w-full px-2" onSubmit={formik.handleSubmit}>
        {/* Product Name */}
        <label htmlFor="name" className="block mb-6">
          <p className="text-sm uppercase">product name</p>
          <input
            {...formik.getFieldProps('name')}
            placeholder={formik.initialValues.name}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="name" />
        </label>

        {/* Product Description */}
        <label htmlFor="description" className="block mb-6">
          <p className="text-sm uppercase">product description</p>
          <textarea
            {...formik.getFieldProps('description')}
            className="textarea textarea-bordered  w-full"
          />
          <ErrorMessage formik={formik} fieldName="description" />
        </label>

        {/* Product Unit Price */}
        <label htmlFor="unitPrice" className="block mb-6">
          <p className="text-sm uppercase">product unit price (ngn)</p>
          <input
            type="number"
            {...formik.getFieldProps('unitPrice')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="unitPrice" />
        </label>

        {/* Product Unit */}
        <label htmlFor="unit" className="block mb-6">
          <p className="text-sm uppercase">
            PRODUCT UNIT (KG, CRATES, LITERS, BAGS ETC)
          </p>
          <select
            className="select select-bordered min-w-full"
            {...formik.getFieldProps('unit')}
          >
            <option value="" disabled>
              {formik.values.unit || '-- Select Product Unit --'}
            </option>
            {ProductUnits.map((unit, idx) => (
              <option value={unit} key={idx}>
                {unit}
              </option>
            ))}
          </select>
          <ErrorMessage formik={formik} fieldName="unit" />
        </label>

        {/* Product Unit Weight */}
        <label htmlFor="unitWeight" className="block mb-6">
          <p className="text-sm uppercase">PRODUCT UNIT WEIGHT</p>
          <input
            {...formik.getFieldProps('unitWeight')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="unitWeight" />
        </label>

        {/* Product Quantity */}
        <label htmlFor="quantity" className="block mb-6">
          <p className="text-sm uppercase">PRODUCT QUANTITY AVAILABLE</p>
          <input
            type="number"
            {...formik.getFieldProps('quantity')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="quantity" />
        </label>

        {/* Product Minimum Sellable Quantity */}
        <label htmlFor="min_sellable_quantity" className="block mb-6">
          <p className="text-sm uppercase">MINIMUN SELLABLE QUANTITY</p>
          <input
            type="number"
            {...formik.getFieldProps('min_sellable_quantity')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="min_sellable_quantity" />
        </label>

        {/* Product Low Stock Alert Level */}
        <label htmlFor="low_stock_alert_level" className="block mb-6">
          <p className="text-sm uppercase">Low Stock Alert Level</p>
          <input
            type="number"
            {...formik.getFieldProps('low_stock_alert_level')}
            className="input input-bordered w-full"
          />
          <ErrorMessage formik={formik} fieldName="low_stock_alert_level" />
        </label>

        {/* Product Category */}
        <label htmlFor="categoryId" className="w-full block mb-6">
          <p className="text-sm uppercase">PRODUCT CATEGORY</p>
          <select
            className="select min-w-full"
            {...formik.getFieldProps('categoryId')}
            disabled={isLoadingProductCategories}
          >
            <option value="" disabled>
              -- Select Product Category --
            </option>
            {productCategories?.map((item, idx) => (
              <option value={item.id} key={idx}>
                {item.name}
              </option>
            ))}
          </select>
          <ErrorMessage formik={formik} fieldName="categoryId" />
        </label>

        {/* Product Location */}
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

        {/* Product Region */}
        <div className="block mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <label htmlFor="state" className="block w-full">
              <p className="text-sm uppercase">PRODUCT STATE</p>
              <select
                className="select min-w-full"
                name="state"
                defaultValue="Lagos"
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
                <option value="Lagos">Lagos</option>
              </select>
            </label>

            <label htmlFor="lcda" className="block w-full">
              <p className="text-sm uppercase">PRODUCT LCDA</p>
              <select
                className="select min-w-full"
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
                className="select min-w-full"
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

        {/* Product Images Upload */}
        <label htmlFor="images">
          <p className="text-sm uppercase">
            PRODUCT IMAGES (can add to four images)
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            maxLength={1}
            max={1}
            name="images"
            id="images"
            className="file-input file-input-bordered text-sm w-full max-w-md"
            onChange={handleUploadImages}
            disabled={images.length >= 4}
          />
        </label>

        {/* Product Existing images */}
        <>
          {images.length > 0 && (
            <div className="flex items-center gap-2 mt-6">
              {images.map((image, idx) => {
                const imgSrc =
                  typeof image === 'string' ? image : URL.createObjectURL(image)
                return (
                  <div
                    key={idx}
                    className="w-24 h-24 flex items-center justify-center rounded-md relative overflow-hidden border skeleton bg-slate-100"
                  >
                    <img
                      src={imgSrc}
                      alt=""
                      className="w-full h-full object-cover peer"
                      onClick={() => handleRemoveImg(idx)}
                    />{' '}
                    <div className="text-white text-lg bg-black/40 absolute w-full h-full items-center justify-center pointer-events-none hidden peer-hover:flex">
                      <FaRegTrashCan />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>

        <div className="w-full flex justify-center mt-6">
          <button
            type="submit"
            className="btn btn-outline uppercase  border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr"
            disabled={false}
          >
            {isUpdatingProduct ? (
              <span className="loading loading-dots loading-md bg-orange-clr" />
            ) : (
              'update product'
            )}
          </button>
        </div>
      </form>
    </>
  )
}
