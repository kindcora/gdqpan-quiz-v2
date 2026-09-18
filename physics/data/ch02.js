window.VLDC_CHAPTERS = window.VLDC_CHAPTERS || [];
window.VLDC_CHAPTERS.push({
  "id": "ch02",
  "number": 2,
  "short": "Từ học",
  "title": "Từ học",
  "glossary": [
    {
      "k": "$i,I$",
      "mean": "cường độ dòng điện",
      "unit": "A",
      "note": "$i=dq/dt$; chiều quy ước: hạt $+ $ "
    },
    {
      "k": "$\\vec{J}$",
      "mean": "mật độ dòng",
      "unit": "A/m$^2$",
      "note": "$J=I/S$ nếu đều; $\\vec{J}=\\sigma\\vec{E}$"
    },
    {
      "k": "$\\mathcal{E}$",
      "mean": "suất điện động nguồn",
      "unit": "V",
      "note": "công nguồn trên một coulomb dương đi một vòng mạch"
    },
    {
      "k": "$\\vec{B}$",
      "mean": "cảm ứng từ",
      "unit": "T",
      "note": "đặc trưng lực từ; xuyên lòng bàn tay trái (bài giảng)"
    },
    {
      "k": "$\\vec{H}$",
      "mean": "cường độ từ trường",
      "unit": "A/m",
      "note": "$H$ có đơn vị A/m. $\\vec B=\\mu\\mu_0\\vec H$ trong môi trường tuyến tính, đẳng hướng; H chỉ độc lập độ từ thẩm trong một số hình học đối xứng."
    },
    {
      "k": "$\\mu_0$",
      "mean": "độ từ thẩm chân không",
      "unit": "T·m/A",
      "note": "$\\mu_0\\approx4\\pi\\times10^{-7}$ T·m/A (xấp xỉ dùng trong các bài tính)."
    },
    {
      "k": "$\\mu$",
      "mean": "độ từ thẩm tương đối",
      "unit": "—",
      "note": "Vật nghịch từ có $\\mu<1$; thuận từ có $\\mu>1$. Không khí lấy xấp xỉ $\\mu=1$."
    },
    {
      "k": "$\\vec{F}$",
      "mean": "lực từ trên dây",
      "unit": "N",
      "note": "$d\\vec{F}=I d\\vec{\\ell}\\times\\vec{B}$"
    },
    {
      "k": "$\\vec{F}_L$",
      "mean": "thành phần từ của lực Lorentz",
      "unit": "N",
      "note": "$\\vec{F}_L=q\\vec{v}\\times\\vec{B}$"
    },
    {
      "k": "$n$",
      "mean": "mật độ vòng ống dây",
      "unit": "m$^{-1}$",
      "note": "$n=N/\\ell$"
    }
  ],
  "formulas": [
    {
      "name": "Dòng điện & suất điện động",
      "latex": "$$i=\\dfrac{dq}{dt},\\quad \\mathcal{E}=\\dfrac{A}{q}=\\oint \\vec{E}^*\\cdot d\\vec{\\ell}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$i$",
          "mean": "cường độ",
          "unit": "A"
        },
        {
          "k": "$\\mathcal{E}$",
          "mean": "suất điện động",
          "unit": "V"
        }
      ],
      "when": "Dòng = chuyển dời có hướng của điện tích tự do. Nguồn duy trì $\\Delta V$."
    },
    {
      "name": "Cặp $\\vec{B}$, $\\vec{H}$",
      "latex": "$$\\vec{B}=\\mu\\mu_0\\vec{H},\\quad \\vec{H}\\parallel\\vec{B}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$B$",
          "mean": "cảm ứng từ",
          "unit": "T"
        },
        {
          "k": "$H$",
          "mean": "cường độ từ trường",
          "unit": "A/m"
        }
      ],
      "when": "Quan hệ vật liệu tuyến tính, đẳng hướng, không có từ hóa dư. Không suy ra H luôn độc lập môi trường trong mọi hình học."
    },
    {
      "name": "Dây thẳng hữu hạn / vô hạn",
      "latex": "$$B=\\dfrac{\\mu\\mu_0 I}{4\\pi a}(\\sin\\varphi_1+\\sin\\varphi_2),\\quad B_\\infty=\\dfrac{\\mu\\mu_0 I}{2\\pi a}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$a$",
          "mean": "khoảng cách vuông góc tới dây",
          "unit": "m"
        },
        {
          "k": "$\\varphi_{1,2}$",
          "mean": "góc giữa đường nối điểm xét với mỗi đầu dây và đường vuông góc tới dây",
          "unit": "rad"
        }
      ],
      "when": "Dạng tổng hai sin dùng khi chân đường vuông góc nằm giữa hai đầu đoạn dây; trường hợp khác dùng góc có dấu. Không khí $\\mu\\approx1$. Dây vô hạn: $H=I/(2\\pi a)$."
    },
    {
      "name": "Xuyến & ống dây dài",
      "latex": "$$B_{\\mathrm{xuyến}}=\\dfrac{\\mu\\mu_0 NI}{2\\pi R},\\quad B_{\\mathrm{ống}}=\\mu\\mu_0 n I$$",
      "symbols": "",
      "sym": [
        {
          "k": "$N$",
          "mean": "số vòng",
          "unit": "—"
        },
        {
          "k": "$n$",
          "mean": "vòng/m",
          "unit": "m$^{-1}$"
        }
      ],
      "when": "Ống dài: $B$ đều trong lòng, ngoài $\\approx 0$. $n=N/\\ell$."
    },
    {
      "name": "Lực từ trên dây thẳng",
      "latex": "$$\\vec{F}=I\\vec{\\ell}\\times\\vec{B},\\quad F=IlB\\sin\\theta$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\ell$",
          "mean": "vectơ dòng (chiều $I$)",
          "unit": "m"
        },
        {
          "k": "$\\theta$",
          "mean": "góc $(\\vec{\\ell},\\vec{B})$",
          "unit": "rad"
        }
      ],
      "when": "Đoạn thẳng trong $B$ đều. Bàn tay trái: cổ tay→ngón = $I$, lòng bàn tay $B$, ngón cái $F$."
    },
    {
      "name": "Hai dây song song vô hạn",
      "latex": "$$F=\\dfrac{\\mu\\mu_0 I_1 I_2 \\ell}{2\\pi d}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$d$",
          "mean": "khoảng cách hai dây",
          "unit": "m"
        },
        {
          "k": "$\\ell$",
          "mean": "đoạn chịu lực",
          "unit": "m"
        }
      ],
      "when": "I₁, I₂ là độ lớn dòng điện; cùng chiều hút, ngược chiều đẩy. Bỏ ảnh hưởng đầu dây."
    },
    {
      "name": "Thành phần từ của lực Lorentz",
      "latex": "$$\\vec{F}_L=q\\vec{v}\\times\\vec{B},\\quad F_L=|q|vB\\sin\\theta$$",
      "symbols": "",
      "sym": [
        {
          "k": "$q$",
          "mean": "điện tích hạt",
          "unit": "C"
        },
        {
          "k": "$\\vec{v}$",
          "mean": "vận tốc",
          "unit": "m/s"
        }
      ],
      "when": "Lực từ không sinh công vì $\\vec F_B\\cdot\\vec v=0$. Tổng lực Lorentz là $q(\\vec E+\\vec v\\times\\vec B)$; lực điện có thể đổi tốc độ. Dùng chiều tích có hướng với q dương rồi đảo nếu q âm."
    },
    {
      "name": "Hạt trong $\\vec{B}$ đều",
      "latex": "$$R=\\dfrac{mv_\\perp}{|q|B},\\quad T=\\dfrac{2\\pi m}{|q|B},\\quad h=v_{\\parallel}T$$",
      "symbols": "",
      "sym": [
        {
          "k": "$R$",
          "mean": "bán kính quỹ đạo",
          "unit": "m"
        },
        {
          "k": "$T$",
          "mean": "chu kỳ",
          "unit": "s"
        },
        {
          "k": "$h$",
          "mean": "bước helix",
          "unit": "m"
        }
      ],
      "when": "Giả sử $v\\ll c$, chỉ có B tĩnh đều, không lực khác. Với $v_\\perp>0$: quỹ đạo tròn/xoắn ốc. Chu kỳ không phụ thuộc v trong giới hạn phi tương đối tính."
    }
  ],
  "traps": [
    {
      "title": "$H$ không phải tesla",
      "text": " $H$ đơn vị A/m. $B$ mới là tesla. Đề hay hỏi đúng đơn vị để gài bẫy V/m hoặc C/m$^2$."
    },
    {
      "title": "Vô hạn vs hữu hạn",
      "text": " Vô hạn: $B=\\mu\\mu_0 I/(2\\pi a)$. Hữu hạn: có $(\\sin\\varphi_1+\\sin\\varphi_2)/4\\pi$."
    },
    {
      "title": "Bàn tay trái (UTT) vs phải",
      "text": " Bài giảng xác định $\\vec{B}$ xuyên lòng bàn tay trái khi biết $I$ và $\\vec{F}$. Đường sức dây thẳng vẫn dùng nắm tay phải cho chiều $B$."
    },
    {
      "title": "$|v|$ không đổi",
      "text": " Chỉ thành phần từ q(v × B) không sinh công. Nếu có điện trường, tổng lực Lorentz có thể đổi tốc độ hạt."
    },
    {
      "title": "Cùng chiều hút",
      "text": " Hai dây cùng $I$: hút. Ngược: đẩy — ngược trực giác điện tích cùng dấu."
    },
    {
      "title": "Ống dây: $n$ vs $N$",
      "text": " $B=\\mu\\mu_0 n I$ với $n=N/\\ell$ (vòng/m), không nhầm $N$ tổng nếu $\\ell\\neq 1$ m."
    }
  ],
  "visual": {
    "html": "<p><strong>Đọc hình dây thẳng.</strong> $\\vec{B}$ tiếp tuyến vòng tròn đồng tâm. $|B|\\propto I/a$. Chấm $\\odot$ = $I$ ra ngoài giấy.</p><p><strong>Lorentz.</strong> Lực từ vuông góc với cả $\\vec v$ và $\\vec B$ khi lực khác 0; v và B không nhất thiết vuông góc nhau. $q<0$: đảo $\\vec{F}_L$.</p><ol><li>Động cơ / xe điện: lực $I\\ell B$ trên thanh quấn.</li><li>Loa: cuộn trong nam châm, $I(t)$ âm tần $\\to$ màng dao động.</li><li>TMS/MRI: $B$ mạnh; hạt/mô — Lorentz + cộng hưởng từ (MRI), xung $B$ biến thiên (TMS, module 3).</li></ol><p>Lab: 2D đường $B$ dây; 3D helix Lorentz.</p>"
  },
  "mcq": [
    {
      "level": "NB",
      "stem": "Phát biểu đúng về dòng điện (sách bài tập)",
      "choices": {
        "A": "dòng các hạt mang điện dịch chuyển (không cần hướng)",
        "B": "mọi chuyển động của hạt mang điện",
        "C": "dòng dịch chuyển có hướng của các hạt mang điện",
        "D": "dịch chuyển theo mọi hướng của hạt mang điện"
      },
      "answer": "C",
      "whyCorrect": "Bài giảng: dòng điện là dòng chuyển dời <em>có hướng</em> của điện tích tự do.",
      "whyWrong": {
        "A": "Thiếu “có hướng”.",
        "B": "Nhiệt cũng chuyển động.",
        "D": "Mọi hướng $\\Rightarrow$ không có dòng vĩ mô."
      }
    },
    {
      "level": "NB",
      "stem": "Đơn vị vectơ mật độ dòng $\\vec{J}$",
      "choices": {
        "A": "A",
        "B": "A/m",
        "C": "A/m$^2$",
        "D": "C/s (khác A)"
      },
      "answer": "C",
      "whyCorrect": "$J=I/S$ $\\Rightarrow$ A/m$^2$. C/s chính là A nên D không phải đơn vị $J$.",
      "whyWrong": {
        "A": "Đó là $I$.",
        "B": "Đó là $H$.",
        "D": "C/s $=A$, đơn vị dòng không phải mật độ."
      }
    },
    {
      "level": "NB",
      "stem": "Suất điện động nguồn đặc trưng cho",
      "choices": {
        "A": "lực cơ học của vỏ pin",
        "B": "khả năng thực hiện công (trên một đơn vị điện tích dương một vòng)",
        "C": "dung lượng A·h",
        "D": "khả năng tích điện hai cực như tụ"
      },
      "answer": "B",
      "whyCorrect": "$\\mathcal{E}=A/q$, đơn vị volt. Dung lượng acquy là chuyện khác.",
      "whyWrong": {
        "A": "Không.",
        "C": "Dung lượng, không phải $\\mathcal{E}$.",
        "D": "Nhầm tụ."
      }
    },
    {
      "level": "NB",
      "stem": "Đơn vị cường độ từ trường $\\vec{H}$",
      "choices": {
        "A": "A/m",
        "B": "C/m$^2$",
        "C": "V/m",
        "D": "T"
      },
      "answer": "A",
      "whyCorrect": "$H$ đo bằng A/m. $B$ mới là tesla.",
      "whyWrong": {
        "B": "$D$ hoặc $\\sigma$.",
        "C": "$E$.",
        "D": "$B$."
      }
    },
    {
      "level": "NB",
      "stem": "Đơn vị cảm ứng từ $\\vec{B}$",
      "choices": {
        "A": "T",
        "B": "C/m$^2$",
        "C": "A/m",
        "D": "V/m"
      },
      "answer": "A",
      "whyCorrect": "Tesla. $1\\,\\mathrm{T}=1\\,\\mathrm{N/(A\\cdot m)}$.",
      "whyWrong": {
        "B": "$D$.",
        "C": "$H$.",
        "D": "$E$."
      }
    },
    {
      "level": "TH",
      "stem": "Cường độ từ trường dây thẳng dài vô hạn cách dây $r$",
      "choices": {
        "A": "$H=I/(2\\pi r)$",
        "B": "$H=\\mu\\mu_0 I/(2\\pi r)$",
        "C": "$H=I/(4\\pi r)$",
        "D": "$H=\\mu\\mu_0 I/(4\\pi r)$"
      },
      "answer": "A",
      "whyCorrect": "$H$ không phụ thuộc $\\mu$: $H=I/(2\\pi r)$. $B=\\mu\\mu_0 H$.",
      "whyWrong": {
        "B": "Đó là $B$, không phải $H$.",
        "C": "Hữu hạn / nhầm $4\\pi$.",
        "D": "Nhầm $B$ hữu hạn."
      }
    },
    {
      "level": "TH",
      "stem": "Cảm ứng từ dây thẳng dài vô hạn",
      "choices": {
        "A": "$B=\\mu\\mu_0 I/(2\\pi r)$",
        "B": "$B=I/(2\\pi r)$",
        "C": "$B=I/(4\\pi r)$",
        "D": "$B=\\mu\\mu_0 I/(4\\pi r)$"
      },
      "answer": "A",
      "whyCorrect": "Công thức (2.11): $B=\\mu\\mu_0 I/(2\\pi a)$. Không khí $\\mu=1$.",
      "whyWrong": {
        "B": "Đó là $H$.",
        "C": "Sai.",
        "D": "Thiếu $2$ (hữu hạn khi $\\varphi_1=\\varphi_2=90^\\circ$ thì $\\sin+\\sin=2$, $4\\pi$ thành $2\\pi$)."
      }
    },
    {
      "level": "VD",
      "stem": "Dây thẳng vô hạn $I=2$ A. $|B|$ cách dây $10$ cm (không khí)",
      "choices": {
        "A": "$5\\times 10^{-6}$ T",
        "B": "$4\\times 10^{-6}$ T",
        "C": "$1\\times 10^{-5}$ T",
        "D": "$2\\times 10^{-5}$ T"
      },
      "answer": "B",
      "whyCorrect": "$B=2\\times 10^{-7}\\,I/a=2\\times 10^{-7}\\cdot 2/0{,}1=4\\times 10^{-6}$ T.",
      "whyWrong": {
        "A": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $4\\times 10^{-6}$ T.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $4\\times 10^{-6}$ T.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $4\\times 10^{-6}$ T."
      }
    },
    {
      "level": "VD",
      "stem": "Acquy dung lượng $20$ A·h cung cấp $0{,}8$ A. Thời gian dùng (mô hình lý tưởng: dòng không đổi, dùng hết dung lượng định mức)",
      "choices": {
        "A": "$5$ h",
        "B": "$25$ h",
        "C": "$40$ h",
        "D": "$50$ h"
      },
      "answer": "B",
      "whyCorrect": "$t=Q/I$ với dung lượng $20$ A·h: $20/0{,}8=25$ h.",
      "whyWrong": {
        "A": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $25$ h.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $25$ h.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $25$ h."
      }
    },
    {
      "level": "TH",
      "stem": "Hai dây song song cùng chiều dòng",
      "choices": {
        "A": "hút nhau",
        "B": "đẩy nhau",
        "C": "không lực",
        "D": "chỉ có lực dọc dây"
      },
      "answer": "A",
      "whyCorrect": "Mỗi dây nằm trong $B$ của dây kia; $I\\ell B$ hướng vào nhau.",
      "whyWrong": {
        "B": "Ngược chiều mới đẩy.",
        "C": "Có lực.",
        "D": "Lực $\\perp$ dây, trong mặt phẳng hai dây."
      }
    },
    {
      "level": "TH",
      "stem": "Chỉ có từ trường tĩnh, không có điện trường hay lực khác. Thành phần từ của lực Lorentz $\\vec F_B=q\\vec v\\times\\vec B$",
      "choices": {
        "A": "vuông góc $\\vec{v}$ nên không đổi $|v|$",
        "B": "cùng chiều $\\vec{v}$ nên tăng tốc",
        "C": "luôn $=0$",
        "D": "song song $\\vec{B}$"
      },
      "answer": "A",
      "whyCorrect": "Tích có hướng $\\perp\\vec{v}$ $\\Rightarrow$ công $=0$, $|v|$ không đổi.",
      "whyWrong": {
        "B": "Lực từ vuông góc vận tốc. Lực điện có thể đổi tốc độ nếu có thành phần dọc vận tốc, nhưng không phải luôn cùng chiều vận tốc.",
        "C": "Lực bằng 0 khi q = 0, v = 0, B = 0 hoặc v cùng phương B; không bằng 0 trong mọi trường hợp.",
        "D": "$\\vec{F}_L\\perp\\vec{B}$ nữa."
      }
    },
    {
      "level": "VD",
      "stem": "Ống dây dài $40$ cm, $I=2$ A, cần $B=250\\times 10^{-5}$ T trong lòng (không khí). Số vòng",
      "choices": {
        "A": "$398$ vòng",
        "B": "$479$ vòng",
        "C": "$4790$ vòng",
        "D": "$7490$ vòng"
      },
      "answer": "A",
      "whyCorrect": "$B=\\mu_0 n I$, $B=2{,}50\\times 10^{-3}$ T. $n=B/(\\mu_0 I)\\approx 995$ vòng/m. $N=n\\ell\\approx 398$ vòng.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $398$ vòng.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $398$ vòng.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $398$ vòng."
      }
    },
    {
      "level": "VD",
      "stem": "Hạt có $q\\ne0$, $v\\ll c$, chuyển động chỉ trong B tĩnh đều, $v\\perp B$. Chu kỳ là",
      "choices": {
        "A": "$T=2\\pi m/(|q|B)$ không phụ thuộc $v$",
        "B": "$T\\propto v$",
        "C": "$T\\propto B$",
        "D": "$T=2\\pi R/B$"
      },
      "answer": "A",
      "whyCorrect": "Công thức (2.20). $R\\propto v$ nên $T=2\\pi R/v$ độc lập $v$.",
      "whyWrong": {
        "B": "Nhầm $R$.",
        "C": "$T\\propto 1/B$.",
        "D": "Thiếu $v$ và đơn vị."
      }
    },
    {
      "level": "TH",
      "stem": "Quy tắc bàn tay trái (bài giảng) cho lực từ trên dây: ngón cái chỉ",
      "choices": {
        "A": "chiều lực từ",
        "B": "chiều $\\vec{B}$",
        "C": "chiều dòng",
        "D": "chiều $H$ ngược $B$"
      },
      "answer": "A",
      "whyCorrect": "Cổ tay→ngón: dòng; lòng bàn tay: $B$; ngón cái: $\\vec{F}$.",
      "whyWrong": {
        "B": "Xuyên lòng bàn tay.",
        "C": "Bốn ngón / cổ tay đến ngón.",
        "D": "$H\\parallel B$."
      }
    },
    {
      "level": "VD",
      "stem": "Loa điện: màng dao động vì",
      "choices": {
        "A": "lực từ trên cuộn có $I(t)$ đặt trong $B$ nam châm",
        "B": "Coulomb giữa hai bản tụ chỉ",
        "C": "công thoát electron",
        "D": "Wien dịch phổ"
      },
      "answer": "A",
      "whyCorrect": "Bài giảng Hình 2.13: cuộn + nam châm; $F=IlB$ biến thiên theo tín hiệu.",
      "whyWrong": {
        "B": "Micro tụ — module 1.",
        "C": "Module 6.",
        "D": "Module 6."
      }
    },
    {
      "level": "VDC",
      "stem": "Động cơ xe điện / ô tô điện (thảo luận DCCT) chuyển điện $\\to$ cơ nhờ",
      "choices": {
        "A": "lực từ trên thanh dẫn mang dòng trong từ trường stato/rotor",
        "B": "chỉ hiệu ứng Joule",
        "C": "chỉ lồng Faraday",
        "D": "chỉ giao thoa I-âng"
      },
      "answer": "A",
      "whyCorrect": "$\\vec{F}=I\\vec{\\ell}\\times\\vec{B}$ tạo moment quay. Joule là tổn hao, không phải nguyên lý moment.",
      "whyWrong": {
        "B": "Tỏa nhiệt, không quay hữu ích.",
        "C": "Che điện trường.",
        "D": "Quang."
      }
    },
    {
      "level": "TH",
      "stem": "Ống dây thẳng dài: $B$ ngoài lòng",
      "choices": {
        "A": "$\\approx 0$ (lý tưởng)",
        "B": "bằng $B$ trong",
        "C": "như dây thẳng $I_{\\mathrm{tổng}}$",
        "D": "vô hạn"
      },
      "answer": "A",
      "whyCorrect": "Mô hình ống dài: trường đều trong, ngoài triệt.",
      "whyWrong": {
        "B": "Sai.",
        "C": "Không dùng $I/(2\\pi r)$ cho ngoài ống lý tưởng.",
        "D": "Sai."
      }
    },
    {
      "level": "VD",
      "stem": "$I=3$ A, dây vô hạn, $H$ cách $12$ cm",
      "choices": {
        "A": "$3{,}98$ A/m",
        "B": "$1{,}59$ A/m",
        "C": "$0{,}318$ A/m",
        "D": "$0{,}159$ A/m"
      },
      "answer": "A",
      "whyCorrect": "$H=I/(2\\pi r)=3/(2\\pi\\cdot 0{,}12)\\approx 3{,}98$ A/m.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}98$ A/m.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}98$ A/m.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}98$ A/m."
      }
    },
    {
      "level": "NB",
      "stem": "Nếu $\\vec v$ cùng phương $\\vec B$ tĩnh thì thành phần từ của lực Lorentz",
      "choices": {
        "A": "$=0$, hạt thẳng đều (bỏ lực khác)",
        "B": "tròn",
        "C": "cực đại",
        "D": "cùng $\\vec{v}$"
      },
      "answer": "A",
      "whyCorrect": "$\\sin\\theta=0\\Rightarrow F_L=0$.",
      "whyWrong": {
        "B": "Cần $v_\\perp$.",
        "C": "Cực đại khi $\\theta=90^\\circ$.",
        "D": "Tích có hướng không cùng $v$."
      }
    },
    {
      "level": "VDC",
      "stem": "TMS (kích thích từ xuyên sọ) / MRI dùng $B$ mạnh. Phát biểu đúng",
      "choices": {
        "A": "MRI: cộng hưởng từ hạt nhân trong $B_0$; TMS: xung $dB/dt$ cảm ứng điện trong mô (module 3)",
        "B": "cả hai là lực Coulomb tĩnh trên proton đứng yên",
        "C": "MRI bắn proton cyclotron vĩ mô ra khỏi đầu",
        "D": "không liên quan Lorentz hay cảm ứng"
      },
      "answer": "A",
      "whyCorrect": "MRI: $\\omega\\propto B$. TMS: Faraday trên mô dẫn. Lorentz trên hạt tải là nền từ học.",
      "whyWrong": {
        "B": "Proton trong mô không “đứng yên tĩnh điện” kiểu đó.",
        "C": "Không.",
        "D": "Có."
      }
    },
    {
      "level": "TH",
      "stem": "Pin/nguồn (sản phẩm TN DCCT) duy trì dòng vì",
      "choices": {
        "A": "suất điện động thực hiện công chống lực tĩnh điện trên hạt tải",
        "B": "$E=0$ trong mạch kín",
        "C": "chỉ có $B$ đều",
        "D": "O-G bắt buộc $I=0$"
      },
      "answer": "A",
      "whyCorrect": "Định nghĩa $\\mathcal{E}=A/q$ trên một vòng.",
      "whyWrong": {
        "B": "Trong lòng nguồn có trường ngoài tĩnh điện.",
        "C": "Không đủ.",
        "D": "Sai."
      }
    },
    {
      "level": "VD",
      "stem": "So sánh hai thí nghiệm với cùng hạt, cùng tốc độ $v\\ll c$, $v\\perp B$ tĩnh. Khi độ lớn B ở thí nghiệm thứ hai gấp đôi, bán kính $R=mv/(|q|B)$",
      "choices": {
        "A": "giảm nửa",
        "B": "gấp đôi",
        "C": "không đổi",
        "D": "gấp bốn"
      },
      "answer": "A",
      "whyCorrect": "$R\\propto 1/B$.",
      "whyWrong": {
        "B": "Đảo.",
        "C": "Với m, |q| và v cố định, R phụ thuộc nghịch đảo B nên không thể giữ nguyên.",
        "D": "Nhầm $B^2$."
      }
    },
    {
      "level": "TH",
      "stem": "Xuyến lý tưởng quấn đều N vòng, lõi tuyến tính, bán kính trung bình R, tiết diện nhỏ so với R. Cảm ứng từ gần bán kính R là",
      "choices": {
        "A": "$B=\\mu\\mu_0 NI/(2\\pi R)$ (trong lòng xuyến)",
        "B": "$B=\\mu\\mu_0 I/(2\\pi R)$ quên $N$",
        "C": "$B=0$ trong lòng",
        "D": "$B=\\mu\\mu_0NI\\,(2\\pi R)$"
      },
      "answer": "A",
      "whyCorrect": "Công thức (2.12).",
      "whyWrong": {
        "B": "Thiếu $N$.",
        "C": "Trong lòng mới có $B$.",
        "D": "Phải chia cho chiều dài vòng Ampe 2πR, không nhân với chiều dài này."
      }
    },
    {
      "level": "VDC",
      "stem": "Phát biểu nào <strong>sai</strong>?",
      "choices": {
        "A": "$\\vec{H}\\parallel\\vec{B}$ trong môi trường đẳng hướng bài giảng",
        "B": "Chỉ có lực từ tác dụng thì tốc độ hạt không đổi",
        "C": "đơn vị $H$ là tesla",
        "D": "cùng chiều dòng: hai dây hút"
      },
      "answer": "C",
      "whyCorrect": "$H$ là A/m, không phải tesla. A, B, D đúng.",
      "whyWrong": {
        "A": "Đúng.",
        "B": "Đúng.",
        "D": "Đúng."
      }
    }
  ],
  "essays": [
    {
      "kind": "Ứng dụng",
      "title": "Pin và nguồn đơn giản (DCCT)",
      "problem": "<p>Giải thích suất điện động và ước thời gian acquy $12$ V, $20$ A·h nuôi tải $4$ A (bỏ tổn hao).</p>",
      "tip": "Dung lượng A·h; $\\mathcal{E}$ ≠ dung lượng.",
      "steps": {
        "s1": "<p>Pin: phản ứng hóa học duy trì tách điện tích hai cực $\\Rightarrow\\mathcal{E}$.</p>",
        "s2": "<p>$I=4$ A, $Q=20$ A·h $=7{,}2\\times 10^4$ C.</p>",
        "s3": "<p>$t=Q/I$ (A·h / A = h). Công nguồn $A=\\mathcal{E}q$.</p>",
        "s4": "<p>$t=20/4=5$ h. $\\mathcal{E}\\approx 12$ V (nếu bỏ $r$ trong).</p>"
      }
    },
    {
      "kind": "Công thức",
      "title": "$B$ dây thẳng",
      "problem": "<p>$I=2$ A, $a=10$ cm, không khí. Tính $B$ và $H$.</p>",
      "tip": "$\\mu_0/(2\\pi)=2\\times 10^{-7}$.",
      "steps": {
        "s1": "<p>Dây vô hạn, điểm cách $a$.</p>",
        "s2": "<p>$a=0{,}10$ m, $\\mu=1$.</p>",
        "s3": "<p>$B=\\mu_0 I/(2\\pi a)$, $H=I/(2\\pi a)$.</p>",
        "s4": "<p>$B=4\\times 10^{-6}$ T, $H=3{,}18$ A/m.</p>"
      }
    },
    {
      "kind": "Lorentz",
      "title": "Hạt trong $B$ đều",
      "problem": "<p>Electron $v=10^6$ m/s vuông góc $B=0{,}01$ T. Tính $R$ và $T$. $m=9{,}1\\times 10^{-31}$ kg, $e=1{,}6\\times 10^{-19}$ C.</p>",
      "tip": "$|v|$ không đổi.",
      "steps": {
        "s1": "<p>$v\\perp B$ $\\Rightarrow$ tròn đều, Lorentz = hướng tâm.</p>",
        "s2": "<p>SI đã đủ.</p>",
        "s3": "<p>$R=mv/(eB)$, $T=2\\pi m/(eB)$.</p>",
        "s4": "<p>$R\\approx 5{,}7\\times 10^{-4}$ m; $T\\approx 3{,}6\\times 10^{-9}$ s.</p>"
      }
    },
    {
      "kind": "Ứng dụng",
      "title": "Động cơ một chiều có cổ góp",
      "problem": "<p>Trong mô hình động cơ một chiều có cổ góp, đoạn dây $\\ell=0{,}20$ m, $I=5$ A, $B=0{,}40$ T vuông góc. Tính lực trên đoạn dây và nêu vai trò cổ góp.</p>",
      "tip": "$F=IlB$.",
      "steps": {
        "s1": "<p>Dây trong từ trường stato.</p>",
        "s2": "<p>$\\theta=90^\\circ$.</p>",
        "s3": "<p>$F=I\\ell B$. Cổ góp đảo chiều dòng trong khung sau mỗi nửa vòng để mômen duy trì chiều quay. Động cơ xe điện không phải loại nào cũng có cổ góp cơ khí.</p>",
        "s4": "<p>$F=0{,}40$ N.</p>"
      }
    },
    {
      "kind": "Hai dây",
      "title": "Tương tác hai dòng",
      "problem": "<p>$I_1=I_2=10$ A, $d=2$ cm, $\\ell=1$ m, cùng chiều. Tính $F$ và hút/đẩy.</p>",
      "tip": "$\\mu_0/(2\\pi)=2\\times 10^{-7}$.",
      "steps": {
        "s1": "<p>Hai dây song song vô hạn.</p>",
        "s2": "<p>$d=0{,}02$ m.</p>",
        "s3": "<p>$F=\\mu_0 I_1 I_2\\ell/(2\\pi d)$.</p>",
        "s4": "<p>$F=10^{-3}$ N, hút.</p>"
      }
    },
    {
      "kind": "Ứng dụng",
      "title": "Loa và MRI (định tính)",
      "problem": "<p>So sánh vai trò $\\vec{B}$ trong loa và trong MRI.</p>",
      "tip": "Loa: lực $I\\ell B$ âm tần. MRI: $B_0$ tách mức + RF.",
      "steps": {
        "s1": "<p>Loa: cuộn + nam châm. MRI: nam châm siêu dẫn + gradient + RF.</p>",
        "s2": "<p>Không cần số, nêu đơn vị $B$ tesla (MRI vài tesla, loa $\\sim 0{,}5$–$1$ T khe từ).</p>",
        "s3": "<p>Loa: $F(t)\\propto I(t)$. MRI: tần số Larmor $\\propto B$, không phải “bắn” proton vĩ mô.</p>",
        "s4": "<p>Kết: cùng nền từ học, cơ chế khác module 3 (cảm ứng) với TMS.</p>"
      }
    }
  ]
});
