export default function StickyCta() {
  function handleClick() {
    document.getElementById('capture').scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="sticky-cta" id="stickyCta">
      <div className="txt">Free strategy call<b>Takes 30 seconds</b></div>
      <button type="button" onClick={handleClick}>Fill My Details →</button>
    </div>
  )
}
