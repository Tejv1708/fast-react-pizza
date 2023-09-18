import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { formatCurrency } from "../../utils/helpers"
import { addItem } from "../cart/cartSlice"
import DeleteItem from "../cart/DeleteItem"
import getCurrentQuantityById from "../cart/cartSlice"

// eslint-disable-next-line react/prop-types

function MenuItem({ pizza }) {
    // eslint-disable-next-line react/prop-types
    const dispatch = useDispatch()
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

    // const currentQuantity = useSelector(getCurrentQuantityById(id))
    // console.log(currentQuantity)
    function handleAddToCart() {
        const newItem = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        }
        dispatch(addItem(newItem))
    }
    return (
        <li className="flex gap-4 py-2">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut ? "greyscale  opacity-70 " : ""}`}
            />
            <div className="flex grow flex-col pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm capitalize italic text-stone-500">
                    {ingredients.join(", ")}
                </p>
                <div className="mt-auto flex items-center justify-between ">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className=" text-sm font-medium uppercase text-stone-500">
                            {" "}
                            Sold out
                        </p>
                    )}
                    <DeleteItem pizzaId={id} />
                    {!soldOut && (
                        <Button onClick={handleAddToCart} type="small">
                            {" "}
                            Add to cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    )
}

export default MenuItem
